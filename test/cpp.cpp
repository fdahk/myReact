#include<iostream>
#include<cstring>
using namespace std;
typedef struct BiTNode
{
char data;
struct BiTNode *lchild,*rchild;
}BiTNode,*BiTree;

//根据先序遍历序列、中序遍历序列，创建一棵二叉树
BiTree CreateTree(char *preorder, char *inorder, int n)
{
	if(n == 0)
		return NULL;
	
	// 创建根节点，先序序列的第一个元素是根
	BiTree root = new BiTNode;
	root->data = preorder[0];
	
	// 在中序序列中找到根节点的位置
	int i;
	for(i = 0; i < n; i++)
	{
		if(inorder[i] == preorder[0])
			break;
	}
	
	// i是根节点在中序序列中的位置
	// 中序序列中，根节点左边的i个元素是左子树，右边的n-i-1个元素是右子树
	// 先序序列中，第1个元素是根，接下来i个元素是左子树，剩下的是右子树
	root->lchild = CreateTree(preorder + 1, inorder, i);
	root->rchild = CreateTree(preorder + i + 1, inorder + i + 1, n - i - 1);
	
	return root;
}

//后序遍历二叉树
void PostOrder(BiTree T)
{
	if(T != NULL)
	{
		PostOrder(T->lchild);
		PostOrder(T->rchild);
		cout << T->data;
	}
}

int main()
{
	BiTree T;
	char pre[100],ino[100];
	cin>>pre;
	cin>>ino;
	int len = strlen(pre);
	T=CreateTree(pre,ino,len);
	PostOrder(T);
    cout<<endl;
    return 1;
}
