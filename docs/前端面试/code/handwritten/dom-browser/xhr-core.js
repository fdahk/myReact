/*
实现目标：
- 手写一个基于 `XMLHttpRequest` 的最小 AJAX 封装。
-
核心思路：
- 创建 `XMLHttpRequest` 实例，配置请求方法、URL 和请求头。
- 监听 `readystatechange`，在请求完成后按状态码决定 resolve / reject。
- 让调用方通过 Promise 风格消费结果。
-
复杂度 / 运行特征：
- 封装层本身是 O(1)，真实耗时取决于网络请求。
-
易错点：
- `readyState === 4` 才表示请求完成。
- 2xx 与 304 一般视为成功，其他状态码通常走失败分支。
- 面试里要说明 XHR 和 fetch 的差别，例如取消、进度、默认 reject 语义。
-
适用场景 / 面试表达点：
- 常用于解释 AJAX 最小实现、请求封装和浏览器原生网络 API。
*/

function ajax(url, options = {}) {
  const { method = 'GET', headers = {}, body = null, timeout = 0 } = options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.timeout = timeout;

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`Request failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error'));
    xhr.ontimeout = () => reject(new Error('Request timeout'));
    xhr.send(body);
  });
}

export { ajax };
