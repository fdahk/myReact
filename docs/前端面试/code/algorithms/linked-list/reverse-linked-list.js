function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

const head = new ListNode(1, new ListNode(2, new ListNode(3)));
console.log(reverseList(head));
