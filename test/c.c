#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define maxsize 100

// 题目1：回文字符串判定 - 使用顺序栈实现
typedef int elemtype;
typedef struct node {
    elemtype elem[maxsize];
    int top;
} seqstack;

// 栈的基本操作
void initStack(seqstack *s) {
    s->top = -1;
}

int isEmpty(seqstack *s) {
    return s->top == -1;
}

int isFull(seqstack *s) {
    return s->top == maxsize - 1;
}

void push(seqstack *s, elemtype x) {
    if (!isFull(s)) {
        s->elem[++s->top] = x;
    }
}

elemtype pop(seqstack *s) {
    if (!isEmpty(s)) {
        return s->elem[s->top--];
    }
    return -1; // 栈空返回-1
}

// 回文字符串判定函数
int isPalindrome(char *str) {
    seqstack s;
    initStack(&s);
    int len = strlen(str);
    int i;
    
    // 将字符串的前半部分入栈
    for (i = 0; i < len / 2; i++) {
        push(&s, str[i]);
    }
    
    // 从字符串的后半部分开始比较
    // 如果字符串长度为奇数，跳过中间字符
    int start = (len % 2 == 0) ? len / 2 : len / 2 + 1;
    
    for (i = start; i < len; i++) {
        if (isEmpty(&s) || pop(&s) != str[i]) {
            return 0; // 不是回文
        }
    }
    
    return 1; // 是回文
}

// 题目2：猴子选大王 - 约瑟夫环问题
typedef struct queueNode {
    elemtype elem[maxsize];
    int front, rear;
} seqqueue;

void initQueue(seqqueue *q) {
    q->front = q->rear = 0;
}

int isQueueEmpty(seqqueue *q) {
    return q->front == q->rear;
}

int isQueueFull(seqqueue *q) {
    return (q->rear + 1) % maxsize == q->front;
}

void enqueue(seqqueue *q, elemtype x) {
    if (!isQueueFull(q)) {
        q->elem[q->rear] = x;
        q->rear = (q->rear + 1) % maxsize;
    }
}

elemtype dequeue(seqqueue *q) {
    if (!isQueueEmpty(q)) {
        elemtype x = q->elem[q->front];
        q->front = (q->front + 1) % maxsize;
        return x;
    }
    return -1;
}

int getQueueSize(seqqueue *q) {
    return (q->rear - q->front + maxsize) % maxsize;
}

// 猴子选大王函数
int monkeyKing(int n, int m) {
    seqqueue q;
    initQueue(&q);
    int i;
    
    // 将1到n号猴子入队
    for (i = 1; i <= n; i++) {
        enqueue(&q, i);
    }
    
    // 开始选大王过程
    while (getQueueSize(&q) > 1) {
        // 报数过程：前m-1个猴子重新入队，第m个猴子出局
        for (i = 1; i < m; i++) {
            int monkey = dequeue(&q);
            enqueue(&q, monkey);
        }
        // 第m个猴子出局
        int eliminated = dequeue(&q);
        printf("Monkey %d is eliminated.\n", eliminated);
    }
    
    // 返回最后剩下的猴子编号
    return dequeue(&q);
}

int main() {
    // 测试题目1：回文字符串判定
    printf("=== 题目1：回文字符串判定 ===\n");
    char test1[] = "abba";
    char test2[] = "abdba"; 
    char test3[] = "good";
    
    printf("字符串 \"%s\" %s回文\n", test1, isPalindrome(test1) ? "是" : "不是");
    printf("字符串 \"%s\" %s回文\n", test2, isPalindrome(test2) ? "是" : "不是");
    printf("字符串 \"%s\" %s回文\n", test3, isPalindrome(test3) ? "是" : "不是");
    
    // 测试题目2：猴子选大王
    printf("\n=== 题目2：猴子选大王 ===\n");
    int n, m;
    
    printf("请输入猴子总数 n: ");
    scanf("%d", &n);
    printf("请输入报数间隔 m: ");
    scanf("%d", &m);
    
    if (n > 0 && m > 0) {
        int king = monkeyKing(n, m);
        printf("最终的猴子大王是：%d号猴子\n", king);
    } else {
        printf("输入的n和m必须大于0\n");
    }
    
    return 0;
}
