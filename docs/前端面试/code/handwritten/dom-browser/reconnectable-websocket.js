/*
实现目标：
- 手写一个带自动重连能力的 `WebSocket` 封装。
-
核心思路：
- 连接建立后监听 `open`、`message`、`close`、`error`。
- 当连接异常关闭且不是手动关闭时，按最大次数和间隔策略重连。
- 把外部关注点简化成 `connect`、`send`、`close` 与事件回调。
-
复杂度 / 运行特征：
- 单次连接逻辑本身是 O(1)，核心复杂度不在算法，而在状态机正确性。
- 当前实现采用固定间隔重连；真实场景可以继续升级为指数退避。
-
易错点：
- 手动关闭和异常关闭要区分，否则用户主动退出也会被自动重连。
- 连接未就绪时发送消息要做状态保护。
- 生产环境通常还会补心跳、鉴权刷新、消息重放、离线队列。
-
适用场景 / 面试表达点：
- 常见于 IM、实时通知、协同编辑。
- 面试里可以继续讲心跳保活、断线重连、消息幂等和状态同步。
*/

class ReconnectableWebSocket {
  constructor(url, options = {}) {
    this.url = url;
    this.retryDelay = options.retryDelay || 1000;
    this.maxRetries = options.maxRetries || 3;
    this.retryCount = 0;
    this.manuallyClosed = false;
    this.socket = null;
    this.handlers = {
      open: options.onOpen || (() => {}),
      message: options.onMessage || (() => {}),
      close: options.onClose || (() => {}),
      error: options.onError || (() => {}),
    };
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', (event) => {
      this.retryCount = 0;
      this.handlers.open(event);
    });

    this.socket.addEventListener('message', (event) => {
      this.handlers.message(event);
    });

    this.socket.addEventListener('error', (event) => {
      this.handlers.error(event);
    });

    this.socket.addEventListener('close', (event) => {
      this.handlers.close(event);

      if (!this.manuallyClosed) {
        this.reconnect();
      }
    });
  }

  reconnect() {
    if (this.retryCount >= this.maxRetries) {
      return;
    }

    this.retryCount += 1;
    setTimeout(() => {
      this.connect();
    }, this.retryDelay);
  }

  send(data) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not open');
    }

    this.socket.send(data);
  }

  close() {
    this.manuallyClosed = true;
    this.socket?.close();
  }
}

export { ReconnectableWebSocket };
