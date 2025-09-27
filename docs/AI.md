主流AI产品的语音播放实现方式
1. 流式TTS + 实时播放（主流方案）
    ChatGPT、Claude等：
    AI生成文本的同时，将文本片段实时发送给TTS服务
    使用流式TTS技术，边生成音频边播放
    用户听到的是几乎实时的语音反馈
2. 前端TTS方案
    豆包、文心一言等：
    使用浏览器内置的 Web Speech API
    文本生成完成后，直接在前端调用 speechSynthesis.speak()
    优点：无需服务器TTS，响应快，成本低
    缺点：音质一般，语音选择有限
3. 云端TTS + 缓存优化
    Google Assistant、Alexa等：
    使用高质量的云端TTS服务（如Google Cloud TTS、Azure Speech）
    对常用短语进行预生成和缓存
    结合CDN分发，提高访问速度

1.Ollama 是一个开源的本地大语言模型（LLM）运行平台，让用户能够在自己的计算机上私密、高效地运行各种大型语言模型，无需依赖云端服务。
    隐私保护：所有数据和对话都在本地处理，不会上传到云端
    成本控制：避免云端 API 调用费用，一次安装长期使用
    离线可用：无需网络连接即可使用 AI 模型
    自主控制：完全掌控模型的使用和配置
    1. 简化部署
    使用 Docker 容器技术
    将模型权重、配置和数据打包成 Modelfile
    一条命令即可启动模型：ollama run llama2

### Coze
chat SDK 安装代码
<!-- SDK引入 -->
<!-- lf-cdn.coze.cn: Coze的CDN服务器
1.2.0-beta.10: SDK版本号（测试版本）
libs/cn/index.js: 中国区版本的SDK文件 -->
<script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.10/libs/cn/index.js"></script>
<script>
  //创建一个Web聊天客户端实例
  new CozeWebSDK.WebChatClient({
    config: {
      bot_id: '7553978463314247690',
    },
    componentProps: {
      title: 'Coze',
    },
    auth: {
      type: 'token',
      token: 'pat_********',
      onRefreshToken: function () {
        return 'pat_********'
      }
    }
  });
</script>

1.数据流式处理原理和实现
    1.HTTP 流式响应原理：
    客户端请求:
    POST /api/chat HTTP/1.1
    Content-Type: application/json
    { "message": "写一首诗", "stream": true }

    服务器响应:
    HTTP/1.1 200 OK
    Content-Type: text/plain
    Transfer-Encoding: chunked  ← 关键：分块传输编码，这样前端才知道是流式

    数据块1: {"content":"春"}
    数据块2: {"content":"风"}  
    ...

    2.浏览器端流式处理：ReadableStream API
        const reader = response.body?.getReader();

    连接方式：HTTP 长连接（单向数据流）