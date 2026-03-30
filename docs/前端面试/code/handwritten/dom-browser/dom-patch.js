/*
实现目标：
- 手写一个最小版 DOM patch，根据补丁描述更新真实 DOM。
-
核心思路：
- 遍历 patch 列表，按类型分别处理文本替换、属性更新、节点替换与子节点递归更新。
- 这道题通常是接在“虚拟 DOM diff”后面的追问。
-
复杂度 / 运行特征：
- 复杂度与 patch 数量和节点数量相关，最小模型通常可近似看作 O(n)。
-
易错点：
- 删除属性和更新属性要区分。
- patch 是“更新方案”，不是重新整棵树全量创建。
-
适用场景 / 面试表达点：
- 很适合把 diff 和 patch 连成一条完整渲染链路来讲。
*/

function applyPropPatch(element, patch) {
  if (patch.value === undefined || patch.value === null) {
    element.removeAttribute(patch.key);
    return;
  }

  if (patch.key === 'className') {
    element.setAttribute('class', patch.value);
    return;
  }

  element.setAttribute(patch.key, patch.value);
}

function patchDom(node, patches) {
  patches.forEach((patch) => {
    switch (patch.type) {
      case 'TEXT':
        node.textContent = String(patch.value);
        break;
      case 'PROP':
        applyPropPatch(node, patch);
        break;
      case 'REPLACE': {
        const newNode =
          typeof patch.node === 'string'
            ? document.createTextNode(patch.node)
            : document.createElement(patch.node.type);
        node.replaceWith(newNode);
        break;
      }
      case 'REMOVE':
        node.remove();
        break;
      case 'CHILD':
        if (node.childNodes[patch.index]) {
          patchDom(node.childNodes[patch.index], patch.patches);
        }
        break;
      default:
        break;
    }
  });
}

export { patchDom };
