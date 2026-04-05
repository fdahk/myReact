# Netty 与高性能网络编程专题

## 使用方式

这篇补的是后端架构师必须掌握的高性能网络编程能力：

- 为什么 Java 原生 NIO 不够用
- Reactor 模式为什么是高性能服务器的标准架构
- Netty 为什么成为 Java 网络编程事实标准
- 高性能服务器涉及的零拷贝、内存池、粘包拆包怎么讲

如果你的目标是架构师岗位，这篇必须掌握。RPC 框架(Dubbo/gRPC)、消息队列(RocketMQ/Kafka)、网关、IM 系统底层几乎全用 Netty。

---

## 一、Java NIO 基础

1. BIO 和 NIO 的核心区别是什么？
答：BIO(Blocking IO)是一个连接对应一个线程，线程在read/write时阻塞等待。当连接数增加时，线程数量线性增长，上下文切换和内存开销会成为瓶颈。NIO(Non-blocking IO)基于Channel+Buffer+Selector模型，一个线程可以通过Selector同时管理多个Channel的IO事件(可读/可写/连接就绪)，不需要为每个连接分配线程。

2. NIO三大核心组件分别是什么？
答：
- Channel(通道)：双向的数据通道，对应Socket连接。常用：SocketChannel(TCP客户端)、ServerSocketChannel(TCP服务端)、DatagramChannel(UDP)、FileChannel(文件)
- Buffer(缓冲区)：数据读写的中间容器。核心属性：capacity(容量)、position(当前位置)、limit(有效数据上界)。read模式和write模式通过flip()切换
- Selector(选择器)：IO多路复用的核心。一个Selector监听多个Channel，通过select()阻塞等待就绪事件，返回SelectionKey集合(OP_ACCEPT/OP_READ/OP_WRITE/OP_CONNECT)

3. 为什么原生NIO直接使用很痛苦？
答：
- API复杂且容易出错：Buffer的flip/clear/compact语义混乱
- Selector空轮询Bug(epoll bug)：select()在Linux下偶发返回0但不阻塞，导致CPU 100%
- 没有完善的异常处理和断线重连机制
- 没有现成的编解码器、心跳机制、流控
- 粘包拆包需要自己处理
这就是为什么几乎所有Java高性能网络框架都基于Netty而不是直接用NIO

---

## 二、Reactor 模式

4. Reactor模式的核心思想是什么？
答：Reactor模式是一种事件驱动的IO处理架构。核心思想是：一个或多个线程负责监听IO事件(Reactor/Dispatcher)，事件就绪后分发给对应的Handler处理。它把IO等待和业务处理解耦——Reactor只负责检测事件，Handler只负责处理事件。

5. 三种Reactor模型分别是什么？
答：
- 单Reactor单线程：一个线程同时做Reactor(accept+read/write事件检测)和Handler(业务处理)。简单但Handler阻塞会卡住整个Reactor。Redis 6.0之前就是这种模型
- 单Reactor多线程：Reactor线程只负责事件分发，业务处理交给Worker线程池。问题是单Reactor线程可能成为瓶颈(accept和IO读写都在一个线程)
- 主从Reactor(Netty默认)：MainReactor只负责accept新连接，SubReactor负责已建立连接的IO读写事件检测，业务处理可以在SubReactor线程或单独Worker线程池中。这是Netty的标准模型，也是最高性能的方案

6. 为什么主从Reactor是最优方案？
答：因为它实现了职责分离：accept和IO分别由不同线程组处理，避免相互影响。MainReactor只处理连接建立这个轻量操作；SubReactor专注于已建立连接的IO事件处理，每个SubReactor管理一部分Channel，天然做到负载均衡。Nginx、Netty、Memcached都使用这种模型。

---

## 三、Netty 核心架构

7. Netty的线程模型怎么和Reactor对应？
答：
- BossGroup(EventLoopGroup) = MainReactor：负责accept新连接，通常1个线程(EventLoop)就够
- WorkerGroup(EventLoopGroup) = SubReactor：负责已建立连接的IO事件，通常CPU核心数*2个线程
- 每个EventLoop绑定一个线程，管理多个Channel。一个Channel在整个生命周期中只绑定一个EventLoop(避免线程安全问题)
- ChannelPipeline中的Handler默认在EventLoop线程中执行，耗时业务可以指定单独的EventExecutorGroup

8. Netty核心组件分别是什么？
答：
- Bootstrap/ServerBootstrap：启动引导类，配置线程组、Channel类型、Handler
- EventLoopGroup：线程组，包含多个EventLoop
- EventLoop：事件循环，绑定一个线程，负责IO事件检测和处理
- Channel：网络连接的抽象(NioSocketChannel/NioServerSocketChannel)
- ChannelPipeline：Handler链，双向链表结构，Inbound(读方向)和Outbound(写方向)
- ChannelHandler：业务逻辑处理器。ChannelInboundHandler处理入站事件，ChannelOutboundHandler处理出站事件
- ByteBuf：Netty自己的Buffer，比JDK ByteBuffer更易用(读写分离的readerIndex/writerIndex，无需flip)

9. ChannelPipeline的执行顺序是怎样的？
答：Pipeline是一个双向Handler链。入站事件(数据接收)从Head→Tail方向传播，经过所有ChannelInboundHandler；出站事件(数据发送)从Tail→Head方向传播，经过所有ChannelOutboundHandler。常见Pipeline布局：
```
Head → Decoder(入站) → BusinessHandler(入站) → Encoder(出站) → Tail
```
收到数据时：Head→Decoder→BusinessHandler
发送数据时：BusinessHandler→Encoder→Head→网络

---

## 四、Netty 内存管理

10. Netty为什么要自己管理内存？
答：JVM堆内存在进行IO时需要先复制到直接内存(DirectByteBuffer)再调用系统write()，多一次拷贝。而且频繁创建和回收ByteBuffer会加重GC压力。Netty通过内存池(PooledByteBufAllocator)和直接内存管理，减少内存拷贝和GC开销。

11. Netty ByteBuf vs JDK ByteBuffer？
答：
- 读写分离：ByteBuf有readerIndex和writerIndex两个指针，不需要flip()切换模式
- 自动扩容：写入超出容量自动扩容(ByteBuffer不支持)
- 引用计数：通过retain()/release()管理生命周期，用完必须release防止内存泄漏
- 池化支持：PooledByteBuf从内存池分配，避免频繁创建回收
- 零拷贝：CompositeByteBuf可以将多个ByteBuf逻辑组合成一个，不需要物理拷贝；slice()可以切分出一个共享底层数据的视图

12. Netty的零拷贝体现在哪些方面？
答：
- CompositeByteBuf：多个Buffer的逻辑合并，不做物理拷贝
- slice()/duplicate()：共享底层数据的视图
- FileRegion(DefaultFileRegion)：文件传输直接调用OS的sendfile()系统调用，数据不经过用户态
- 堆外内存(Direct Memory)：IO操作直接使用堆外内存，省去堆内→堆外的拷贝

---

## 五、粘包与拆包

13. TCP粘包拆包是怎么产生的？
答：TCP是字节流协议，没有消息边界的概念。发送方的应用层消息到达TCP缓冲区后可能被合并发送(Nagle算法)或拆分(MSS限制)。所以接收方可能一次收到多条消息粘在一起(粘包)，也可能只收到半条消息(拆包)。

14. Netty解决粘包拆包的方案有哪些？
答：Netty提供4种内置Decoder：
- FixedLengthFrameDecoder：固定长度解码，每N个字节为一帧
- DelimiterBasedFrameDecoder：分隔符解码(如\n, \r\n)
- LengthFieldBasedFrameDecoder：最常用。消息头包含长度字段，指定lengthFieldOffset(长度字段偏移)、lengthFieldLength(长度字段字节数)、lengthAdjustment(长度修正)、initialBytesToStrip(跳过字节数)
- LineBasedFrameDecoder：行分隔(\n或\r\n)

LengthFieldBasedFrameDecoder是生产级最常用的方案，几乎所有RPC框架都用这种「Length+Body」格式。

---

## 六、Netty 在主流框架中的应用

15. Dubbo如何使用Netty？
答：Dubbo的NettyServer/NettyClient使用Netty作为底层通信框架。Provider启动时通过ServerBootstrap绑定端口监听；Consumer通过Bootstrap建立连接。Dubbo协议使用自定义的Header(16字节: magic+flag+status+requestId+bodyLength)，通过LengthFieldBasedFrameDecoder解决粘包拆包。

16. RocketMQ如何使用Netty？
答：RocketMQ的Remoting模块基于Netty实现。Broker、Producer、Consumer之间的所有通信都走Netty。使用自定义协议RemotingCommand(Header+Body)，支持同步、异步和单向三种调用模式。

17. gRPC Java如何使用Netty？
答：gRPC Java底层默认使用NettyServerTransport/NettyClientTransport。利用Netty实现HTTP/2的多路复用、流控、Header压缩。每个gRPC Stream对应一个HTTP/2 Stream，共用一条TCP连接。

---

## 七、高性能服务器调优

18. Netty常见性能调优参数有哪些？
答：
- ChannelOption.SO_BACKLOG：TCP全连接队列大小(默认128，高并发场景调高到1024+)
- ChannelOption.TCP_NODELAY：关闭Nagle算法，降低延迟(RPC场景必开)
- ChannelOption.SO_KEEPALIVE：TCP心跳
- ChildChannelOption.SO_RCVBUF/SO_SNDBUF：TCP收发缓冲区大小
- EventLoopGroup线程数：WorkerGroup默认CPU*2，IO密集型可适当增加
- ByteBufAllocator：默认使用PooledByteBufAllocator(池化+直接内存)
- ctx.channel().config().setWriteBufferWaterMark()：写缓冲水位，控制写速度防止OOM

19. 如何排查Netty内存泄漏？
答：
- 开启ResourceLeakDetector：ResourceLeakDetector.setLevel(Level.PARANOID)，会在ByteBuf被GC时检查是否已release
- 检查所有Handler是否正确调用ReferenceCountUtil.release()
- 入站Handler如果不向下传播消息(不调用ctx.fireChannelRead())，必须自己release
- 监控指标：PooledByteBufAllocator.DEFAULT.metric()可以查看内存池使用情况

---

## 八、最值得练熟的 10 个追问

1. BIO/NIO/AIO各自的线程模型和适用场景是什么？
2. Reactor三种模型的区别，Netty用的是哪种？
3. EventLoop和Channel的绑定关系是什么？为什么这样设计？
4. ChannelPipeline的入站和出站事件传播方向是什么？
5. Netty的ByteBuf相比JDK ByteBuffer的优势是什么？
6. Netty的零拷贝体现在哪些方面？
7. TCP粘包拆包的原因和解决方案？
8. LengthFieldBasedFrameDecoder的4个参数分别是什么意思？
9. Dubbo/gRPC/RocketMQ为什么底层都用Netty？
10. 如何排查Netty内存泄漏？

---

## 九、这一篇学到位的标准

学完这篇，你至少要做到下面三件事：

1. 能从BIO→NIO→Reactor→Netty的演进路径讲清楚为什么需要Netty。
2. 能画出Netty的MainReactor+SubReactor+Pipeline架构，并解释每个组件的职责。
3. 能解释零拷贝、内存池、粘包拆包的实现原理，并能和Dubbo/gRPC等框架关联。
