/**
 * 题目目标：每 k 个节点一组翻转链表，不足 k 个的尾部节点保持原顺序。
 * 核心思路：
 * 1. 用 `groupPrev` 标记每组翻转前的前驱节点；
 * 2. 先向前走 k 步确认这一组是否完整存在；
 * 3. 对当前这组做原地链表翻转；
 * 4. 翻转后重新接回前后链表，并推进到下一组。
 * 时间复杂度：O(n)，每个节点被常数次访问。
 * 空间复杂度：O(1)，只用常数级指针。
 * 易错点 / 面试表达点：
 * 1. 不足 k 个节点时要立即停止，不能误翻转。
 * 2. 组内翻转常用“头插”或标准反转模板，这里采用后者。
 * 3. 面试时要把 `groupPrev`、`kth`、`groupNext` 三个关键指针讲清楚。
 */
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function reverseKGroup(head, k) {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth; i += 1) {
      kth = kth.next;
    }
    // 当前位置之后不足 k 个节点，按题意保持原样结束。
    if (!kth) {
      break;
    }

    const groupNext = kth.next;
    let prev = groupNext;
    let current = groupPrev.next;

    // 只在当前这一组范围内做原地反转。
    while (current !== groupNext) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    const temp = groupPrev.next;
    groupPrev.next = kth;
    // temp 原本是组头，翻转后变成组尾，作为下一轮的前驱节点。
    groupPrev = temp;
  }

  return dummy.next;
}
