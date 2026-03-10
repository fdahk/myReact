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

  slow.next = slow.next.next;
  return dummy.next;
}
