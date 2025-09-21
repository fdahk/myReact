const MAXSIZE = 100;

// 顺序表
class SeqList {
    constructor() {
        this.elem = new Array(MAXSIZE); 
        this.length = 0;                 
    }
}

// 插入后仍保持有序
function insertSorted(list, value) {
    if (list.length >= MAXSIZE) {
        return false;
    }
    
    let i = list.length - 1;
    
    while (i >= 0 && list.elem[i] > value) {
        list.elem[i + 1] = list.elem[i]; 
        i--;
    }
    
    list.elem[i + 1] = value;
    list.length++;
    
    return true;
}


// 单链表
class ListNode {
    constructor(data = null) {
        this.data = data;    
        this.next = null;    
    }
}

class LinkedList {
    constructor() {
        this.head = null; 
        this.length = 0;     
    }
    
    append(data) {
        const newNode = new ListNode(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }
}

// 删除指定值
function deleteValue(list, value) {
    let deletedCount = 0;
    
    while (list.head && list.head.data === value) {
        list.head = list.head.next;
        list.length--;
        deletedCount++;
    }
    
    if (list.head) {
        let current = list.head;
        while (current.next) {
            if (current.next.data === value) {
                current.next = current.next.next;
                list.length--;
                deletedCount++;
            } else {
                current = current.next;
            }
        }
    }
    
    return deletedCount;
}
