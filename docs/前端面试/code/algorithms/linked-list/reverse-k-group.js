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
    if (!kth) {
      break;
    }

    const groupNext = kth.next;
    let prev = groupNext;
    let current = groupPrev.next;

    while (current !== groupNext) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    const temp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = temp;
  }

  return dummy.next;
}
