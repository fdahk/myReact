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
    first.next = second.next;
    second.next = first;
    current.next = second;
    current = first;
  }

  return dummy.next;
}
