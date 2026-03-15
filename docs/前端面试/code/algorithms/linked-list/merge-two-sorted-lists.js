/**
 * 题目目标：合并两个升序链表，返回新的升序链表头节点。
 * 核心思路：使用双指针依次比较两个链表当前节点，把较小节点接到结果链表尾部；
 * 当某一条链表耗尽后，直接把另一条链表剩余部分整体接上。
 * 时间复杂度：O(m + n)，两个链表各遍历一次。
 * 空间复杂度：O(1)，只使用常数级额外指针。
 * 易错点 / 面试表达点：
 * 1. dummy 节点能统一处理头节点为空和首个节点选择问题。
 * 2. 这是典型的链表“双指针 + 尾插拼接”模板。
 * 3. 题目通常允许复用原链表节点，因此不需要新建全部节点。
 */
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    // current 始终指向结果链表的最后一个节点。
    current = current.next;
  }

  // 只会有一条链表还有剩余，直接整体接上即可。
  current.next = list1 || list2;
  return dummy.next;
}
