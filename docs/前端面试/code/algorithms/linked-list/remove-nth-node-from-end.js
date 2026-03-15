/**
 * 题目目标：删除链表的倒数第 n 个节点，并返回新的头节点。
 * 核心思路：使用快慢双指针。
 * 先让快指针领先慢指针 n 步，之后二者一起前进；当快指针到达末尾时，
 * 慢指针恰好停在待删除节点的前一个位置，便于直接修改指针完成删除。
 * 时间复杂度：O(n)，链表最多遍历一遍。
 * 空间复杂度：O(1)，只使用常数级额外空间。
 * 易错点 / 面试表达点：
 * 1. 使用 dummy 节点可以统一处理删除头节点的场景。
 * 2. 快指针先走 n 步后，循环条件用 `fast.next`，这样 slow 最终停在前驱节点。
 * 3. 面试里要明确区分“删除节点本身”和“找到删除节点前驱”这两个目标。
 */
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i < n; i += 1) {
    fast = fast.next;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  // slow 停在待删除节点前驱处，直接跳过目标节点即可。
  slow.next = slow.next.next;
  return dummy.next;
}
