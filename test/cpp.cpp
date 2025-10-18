#include<iostream>
#include<cstdlib>
using namespace std;

typedef struct Node {
    int data;
    struct Node* next;
}node;  //队列结点
 
//定义一个链队列
typedef struct LinkQueue {
    node* front; //队首结点
    node* rear; //队尾结点
}LQ;
 
//初始化空链队列
LQ InitLQ(LQ LQ) {
    LQ.front = (node*)malloc(sizeof(node));
    LQ.front->data = -1;
    LQ.front->next = NULL;
    LQ.rear = LQ.front; //队首结点和队尾结点是同一个结点
    return LQ;
}

//进栈，LS是栈顶结点
node* PushStack(node* LS ,int elem) 
{  
    node* new_node = (node*)malloc(sizeof(node)); //创建一个结点
    if (new_node == NULL) {
        cout<<"创建链栈结点失败";
        exit(0);
    }
    else {
        new_node->data = elem;
        new_node->next = LS; 
        return new_node; // 返回新的栈顶结点
    }
}

//入队列
LQ PushQueue(LQ &LQ,int e) {
        
		node* new_node = (node*)malloc(sizeof(node));//生成新结点
		if (new_node == NULL) {
		        cout<<"创建结点失败";
		        exit(0);
		    }
		new_node->data = e;
        new_node->next = NULL;
        LQ.rear->next = new_node; //在队尾结点处插入新结点
        LQ.rear = new_node;//队尾结点后移
        return LQ;
}

//出栈并进队列
LQ PopStack(LQ LQ,node* LS) 
{
    node* temp;
    while (LS != NULL) {
        // 出栈
        temp = LS;
        LS = LS->next;
        
        // 将出栈的元素入队
        temp->next = NULL;
        LQ.rear->next = temp;
        LQ.rear = temp;
    }
    return LQ;
}

//出队列并进栈
node* PopQueue(LQ &LQ,node* LS) 
{
    node* temp;
    
    // 将队列中的所有元素出队并入栈
    while (LQ.front->next != NULL) {
        // 出队
        temp = LQ.front->next;
        LQ.front->next = temp->next;
        
        // 如果队列变空，更新rear指针
        if (LQ.front->next == NULL) {
            LQ.rear = LQ.front;
        }
        
        // 入栈
        LS = PushStack(LS, temp->data);
        
        // 释放出队的结点
        free(temp);
    }
    
    return LS;
}

//打印队列全部元素
void ShowLQ(LQ LQ) {
    node* tmp = LQ.front->next;
    while (tmp != NULL) {
        cout<<tmp->data<<' ';
        tmp = tmp->next;
        }
    cout<<endl;
}
 
int main() 
{
    LQ myLQ;
    int n,e;
    node* mystack = NULL;
    myLQ = InitLQ(myLQ);
    cin>>n;
    for(int i=0;i<n;i++)
    {
    	cin>>e;
		myLQ=PushQueue(myLQ,e);	
	}
    cout<<"原队列:";
	ShowLQ(myLQ);
    mystack=PopQueue(myLQ,mystack);
	
    myLQ=PopStack(myLQ,mystack); 
    cout<<"逆置后队列:";
    ShowLQ(myLQ);
    return 1;
}
