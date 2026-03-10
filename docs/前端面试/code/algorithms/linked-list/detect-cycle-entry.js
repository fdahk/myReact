function detectCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let pointer = head;
      while (pointer !== slow) {
        pointer = pointer.next;
        slow = slow.next;
      }
      return pointer;
    }
  }

  return null;
}
