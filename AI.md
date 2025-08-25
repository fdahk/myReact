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