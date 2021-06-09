// 双边循环
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
