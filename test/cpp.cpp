#include <iostream>
using namespace std;

//奇偶排序函数：采用双指针法，实现偶数在前，奇数在后排列
int *ArraySort(int *nums, int n) {
    int left = 0;           // 左指针，从数组左侧开始
    int right = n - 1;      // 右指针，从数组右侧开始
    int temp;
    
    while(left < right) {
        // 从左边找第一个奇数
        // 如果当前元素是偶数（nums[left] % 2 == 0），继续向右移动
        while(left < right && nums[left] % 2 == 0) {
            left++;
        }
        
        // 从右边找第一个偶数
        // 如果当前元素是奇数（nums[right] % 2 == 1），继续向左移动
        while(left < right && nums[right] % 2 == 1) {
            right--;
        }
        
        // 交换左边的奇数和右边的偶数
        if(left < right) {
            temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
        }
    }
    
    return nums;
}

int main() {
    int *arr;
    int n,i;
    //printf("请输入元素的个数n:");
    cin>>n;
    arr = new int[n];
    // printf("请依次输入数组的数据值:");
    for(i=0;i<n;i++)
        cin>>arr[i];
    arr=ArraySort(arr, n);
    printf("按奇偶排序后的数组元素为:");
    for(i=0;i<n;i++)
        cout<<arr[i]<<' ';
    return 0;
}
