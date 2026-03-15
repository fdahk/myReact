/**
 * 题目目标：判断链表中是否存在环。
 * 核心思路：使用 Floyd 快慢指针。快指针每次走两步，慢指针每次走一步；
 * 如果链表有环，快指针最终一定会在环内追上慢指针；如果无环，快指针会先到达链表末尾。
 * 时间复杂度：O(n)，每个节点最多被快慢指针常数次访问。
 * 空间复杂度：O(1)，不需要额外哈希表。
 * 易错点 / 面试表达点：
 * 1. 循环条件必须写成 `fast && fast.next`，否则访问 `fast.next.next` 会报错。
 * 2. 与哈希表解法相比，快慢指针更节省空间，是面试中的标准解。
 * 3. 这题是“检测是否有环”，不是“找环入口”，但前半段逻辑完全相同。
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    // 一旦相遇，就说明快指针在环中追上了慢指针。
    if (slow === fast) {
      return true;
    }
  }

  return false;
}
