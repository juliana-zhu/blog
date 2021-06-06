---
title: 快速排序
date: 2021-06-05
sidebar: 'auto'
categories:
 - 算法
tags:
 - 排序
 - 算法
publish: true
---
# 快速排序

快速排序的思想是**分治法**，在每一轮挑选一个**基准元素**，并让其他比它大的元素移动到数列一边，比它小的元素移动到数列的另一边，从而把数列拆解成两个部分。

## 选取基准元素
假设数组为`[8,4,5,6,7,2,3,1]`，若选取的基准元素为第一个元素`8`，那么如果把比它小的元素移到左边，则它右侧的所有元素都要移到左边，这是最极端的情况。所以我们可以选取随机的一个元素作为基准元素。

## 双边循环法
+ 先选取基准元素，这里我们选择第一个为基准元素。
  ```javascript
   [4,7,6,5,3,2,8,1]
    ^
   pivot
  ```
+ 设置左右指针
  ```javascript
   [4,7,6,5,3,2,8,1]
    ^             ^
   left          right
  ```
+ 因为我们要得到一个递增的数组，所以若`left`小于等于`pivot`，则`left`指针向右移动，否则停止`left`的移动。若`right`大于等于`pivot`，则`right`指针向左移动，否则停止`right`移动。一轮下来后指针的状态应该是这样的：
  ```javascript
   [4,7,6,5,3,2,8,1]
      ^           ^
     left        right
  ```

+ 然后把`left`和`right`进行交换。让left往右移动一位，right往左移动一位：

  ```javascript
   [4,1,6,5,3,2,8,7]
        ^       ^
       left    right
  ```

+ 再进行第三步和第四步的操作，直到左右指针相等：

  ```javascript
   [4,1,6,5,3,2,8,7]
        ^       ^
        l       r
   // left大于4，left停止；right大于4，right往左，直到right小于等于4为止
   [4,1,6,5,3,2,8,7]
        ^     ^
        l     r    
   // 交换左右指针，让left往右移动一位，right往左移动一位
   [4,1,2,5,3,6,8,7]
          ^ ^
          l r
   // left大于4，left停止；right小于4，right停止；交换左右指针，right往左移动一位
   [4,1,2,3,5,6,8,7]
          ^ 
         r,l
  ```

+ 此时`right`指针和`left`重合`left>=right`，让`pivot`和`left`交换：

  ```javascript
   [3,1,2,4,5,6,8,7]
  ```

这时第一轮已经结束，接下来就以`4`的位置为中点把数组一分为二，再递归以上操作即可得到排序后的数组。完整代码如下：

```javascript
const quickSort = (arr, startIndex, endIndex) => {
  if (startIndex >= endIndex) {
    return;
  }
  const pivotIndex = partition(arr, startIndex, endIndex);
  quickSort(arr, startIndex, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, endIndex);
};

const partition = (arr, left, right) => {
  let pivotIndex = left;
  while (left !== right) {
    while (left < right && arr[right] >= arr[pivotIndex]) {
      right--;
    }
    while (left < right && arr[left] <= arr[pivotIndex]) {
      left++;
    }
    if (left < right) {
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
    }
  }

  let temp = arr[pivotIndex];
  arr[pivotIndex] = arr[left];
  arr[left] = temp;

  return left;
};
const arr = [5, 6, 4, 2, 1, 3, 9];
quickSort(arr, 0, arr.length - 1);
console.log(arr);

```

## 单边循环法

单边循环法对比双边只有一个指针，更为简洁一些，但是目的还是比`pivot`小的元素放到左边。

+ 先选取基准元素，这里我们选择第一个为基准元素。

  ```javascript
   [4,7,6,5,3,2,8,1]
    ^
   pivot
  ```

+ 设置mark指针

  ```javascript
   [4,7,6,5,3,2,8,1]
    ^             
   mark          
  ```

+ 从`startIndex+1`开始遍历，i的值小于pivot的值时，让mark向左移动一位，把i和mark的值交换位置

  ```javascript
   [4,7,6,5,3,2,8,1]
    ^ ^            
    m i  
   [4,7,6,5,3,2,8,1]
    ^   ^            
    m   i   
   [4,7,6,5,3,2,8,1]
    ^     ^            
    m     i 
   [4,7,6,5,3,2,8,1]
    ^       ^            
    m       i
   [4,3,6,5,7,2,8,1]
      ^     ^            
      m     i 
  ```

+ 继续上述操作

  ```javascript
   [4,3,6,5,7,2,8,1]
      ^       ^            
      m       i 
   [4,3,2,5,7,6,8,1]
        ^     ^            
        m     i 
   [4,3,2,5,7,6,8,1]
        ^       ^            
        m       i 
   [4,3,2,5,7,6,8,1]
        ^         ^            
        m         i 
   [4,3,2,1,7,6,8,5]
          ^       ^            
          m       i 
  ```

+ 让`mark`和`pivot`交换值

  ```javascript
  [1,3,2,4,7,6,8,5]
  ```

这时第一轮已经结束，接下来就以`4`的位置为中点把数组一分为二，再递归以上操作即可得到排序后的数组。完整代码如下：

```javascript
// 单边循环
const quickSort = (arr, startIndex, endIndex) => {
  if (startIndex >= endIndex) {
    return;
  }
  const markIndex = partition(arr, startIndex, endIndex);
  quickSort(arr, startIndex, markIndex - 1);
  quickSort(arr, markIndex + 1, endIndex);
};

const partition = (arr, startIndex, endIndex) => {
  let pivotIndex = startIndex;
  let markIndex = pivotIndex;
  for (let i = startIndex + 1; i <= endIndex; i++) {
    if (arr[i] <= arr[pivotIndex]) {
      ++markIndex;
      let temp = arr[markIndex];
      arr[markIndex] = arr[i];
      arr[i] = temp;
    }
  }

  let temp = arr[pivotIndex];
  arr[pivotIndex] = arr[markIndex];
  arr[markIndex] = temp;

  return markIndex;
};
const arr = [5, 6, 4, 2, 1, 3, 9];
quickSort(arr, 0, arr.length - 1);
console.log(arr);

```

