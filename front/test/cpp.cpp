
#include<iostream>
#include"malloc.h"
#include<string>
#define MAXSIZE 50//初始最大容量
#define STACKINCREMENT 10//每次增加的容量
using namespace std;
typedef struct Stack
{
    char data[MAXSIZE];
    int top;
}SeqStack, * PSeqStack;
//初始化
PSeqStack Init_SeqStack(void)
{
    PSeqStack S = (PSeqStack)malloc(sizeof(SeqStack));
    if (S)
    {
        S->top = -1;
    }
    return S;
}
//判空
int  empty(PSeqStack s)
{
    if (s->top == -1)
    {
        return 1;
    }
    return 0;
}
//入栈
int  Push(PSeqStack S, char x)
{
    if (S->top == MAXSIZE - 1)
    {
        return 0;
    }
    else
    {
        S->top++;
        S->data[S->top] = x;
        return 1;
    }
}
//出栈
int Pop_SeqStack(PSeqStack S, char* e)
{
    if (empty(S))
    {
  
        return 0;
  
    }
  
    else
    {
        *e = S->data[S->top];
        S->top--;
        return 1;
    }
}
//括号匹配函数
int Judge(char exp[], PSeqStack S)
{
    for (int i = 0; exp[i] != '\0'; ++i)
    {
        char c = exp[i];
        if (c == '(' || c == '[' || c == '{')
        {
            if (!Push(S, c))
            {
                return 0;
            }
        }
        else if (c == ')' || c == ']' || c == '}')
        {
            char t;
            if (!Pop_SeqStack(S, &t))
            {
                return 0;
            }
            if ((c == ')' && t != '(') ||
                (c == ']' && t != '[') ||
                (c == '}' && t != '{'))
            {
                return 0;
            }
        }
        else
        {
            continue;
        }
    }
    if (empty(S))
    {
        cout<<"栈空"<<endl;
        return 1;
    }
    return 0;
}

int main()
{
    PSeqStack st;
    st = Init_SeqStack();
    char exp[MAXSIZE] = { 0 };
    //"请输入表达式：";
    cin>>exp;
    if (Judge(exp, st))
        cout<<"表达式中括号匹配成功"<<endl;
    else
        cout<<"表达式中括号匹配失败"<<endl;
    return 1;   
}
