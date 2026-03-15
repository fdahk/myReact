/**
 * 题目目标：若链表存在环，返回环的入口节点；否则返回 `null`。
 * 核心思路：使用 Floyd 快慢指针。
 * 第一阶段让快指针每次走两步、慢指针每次走一步，若有环二者一定会相遇；
 * 第二阶段从头节点再出发一个指针，与慢指针同步前进，再次相遇的位置就是环入口。
 * 时间复杂度：O(n)，最多做两次线性扫描。
 * 空间复杂度：O(1)，只使用常数级指针。
 * 易错点 / 面试表达点：
 * 1. 先证明“会不会相遇”，再说明“为什么第二次相遇是入口”，会更有说服力。
 * 2. 这题与只判断有无环的区别是相遇后还要再走第二阶段。
 * 3. 若无环，循环结束条件必须安全处理 `fast` 和 `fast.next` 为空的情况。
 */
function detectCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let pointer = head;
      // 从头指针和相遇点同步前进，它们会在入口处重合。
      while (pointer !== slow) {
        pointer = pointer.next;
        slow = slow.next;
      }
      return pointer;
    }
  }

  return null;
}
