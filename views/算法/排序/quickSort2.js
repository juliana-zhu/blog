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
  for (let i = markIndex + 1; i <= endIndex; i++) {
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
