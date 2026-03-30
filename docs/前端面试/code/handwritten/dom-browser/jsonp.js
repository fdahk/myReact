/*
实现目标：
- 手写一个 JSONP 请求函数，理解跨域脚本注入的经典方案。
-
核心思路：
- 动态创建 `script` 标签，请求地址中拼上回调函数名。
- 服务端返回形如 `callbackName(data)` 的脚本内容。
- 浏览器执行脚本后触发全局回调，再把数据 resolve 给调用方。
-
复杂度 / 运行特征：
- 封装层本身是 O(1)，主要成本在网络请求与脚本执行。
-
易错点：
- JSONP 本质是 `<script>` 跨域能力，不是真正的 XHR。
- 它通常只能做 GET，不适合复杂请求场景。
- 请求结束后要清理全局回调和 script 节点，避免污染页面环境。
-
适用场景 / 面试表达点：
- 适合讲传统跨域方案、为什么 JSONP 能跨域、局限在哪里。
*/

function jsonp(url, params = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const script = document.createElement('script');
    const query = new URLSearchParams({ ...params, callback: callbackName }).toString();

    function cleanup() {
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('JSONP request failed'));
    };

    script.src = `${url}${url.includes('?') ? '&' : '?'}${query}`;
    document.body.appendChild(script);
  });
}

export { jsonp };
