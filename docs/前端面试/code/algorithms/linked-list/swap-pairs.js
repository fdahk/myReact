/**
 * 题目目标：两两交换链表中的相邻节点，并返回交换后的头节点。
 * 核心思路：使用 dummy 节点和指针重连。
 * 每次取出当前待交换的两个节点 `first`、`second`，调整三条边：
 * `first.next`、`second.next`、`current.next`，完成局部翻转后再推进指针。
 * 时间复杂度：O(n)，每个节点最多访问一次。
 * 空间复杂度：O(1)，只使用常数级额外指针。
 * 易错点 / 面试表达点：
 * 1. 交换的是节点，不是值；面试里最好主动强调这一点。
 * 2. 指针重连顺序很关键，先保存节点引用，再改 next，避免链表断开。
 * 3. dummy 节点可以优雅处理头节点参与交换的场景。
 */
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function swapPairs(head) {
  const dummy = new ListNode(0, head);
  let current = dummy;

  while (current.next && current.next.next) {
    const first = current.next;
    const second = current.next.next;
    // 完成局部两节点翻转：current -> second -> first -> 后续链表。
    first.next = second.next;
    second.next = first;
    current.next = second;
    // 交换后 first 落到这一组末尾，下一轮从它后面继续处理。
    current = first;
  }

  return dummy.next;
}
