/**
 * 题目目标：反转单链表并返回新的头节点。
 * 核心思路：使用三个指针迭代反转。
 * `prev` 表示已经反转好的前半段链表头，`current` 表示当前待处理节点，
 * 每轮先保存 `next`，再把 `current.next` 指向 `prev`，最后整体向前推进。
 * 时间复杂度：O(n)，每个节点访问一次。
 * 空间复杂度：O(1)，原地完成反转。
 * 易错点 / 面试表达点：
 * 1. 修改 `current.next` 前一定要先保存原始 `next`，否则后续链表会丢失。
 * 2. 链表反转是很多复杂链表题的基础模板，建议面试时熟练背出。
 * 3. 递归也能写，但迭代法更节省栈空间、更稳定。
 */
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    // 把当前节点指向已经反转好的前半段。
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

const head = new ListNode(1, new ListNode(2, new ListNode(3)));
console.log(reverseList(head));
