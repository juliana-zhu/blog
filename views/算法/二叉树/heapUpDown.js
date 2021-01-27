// 二叉堆的上浮和下沉

/**
 * 上浮 插入
 * @param array
 */
function upAdjust(array){
    // 最后一个节点的下标
    let childIndex = array.length - 1;
    // 最后一个节点的值 即为插入的新值
    let temp = array[childIndex];
    //  父节点
    let parentIndex = (childIndex-1)/2;
    // 如果叶子节点小于父节点 交换 并让叶子节点的下标等于父节点的下标
    while (childIndex > 0 && temp<array[parentIndex]){
        // 把叶子节点的值设置为父节点的值
        array[childIndex] = array[parentIndex];
        // 叶子节点下标上移到父节点
        childIndex = parentIndex;
        // 父节点下标重新计算
        parentIndex = (childIndex-1)/2;
    }
    // 最终让找到的叶子节点的值设置为插入的值
    array[childIndex] = temp;
}

/**
 * 下沉 构建二叉堆时
 * @param array
 * @param parentIndex
 * @param length
 */
function downAdjust(array, parentIndex, length){
    let childIndex = 2*parentIndex+1;
    const temp = array[parentIndex]
    // 如果节点大于左右叶子节点则下沉 和最小的那个交换
    while(childIndex < length){
        // 如果有右孩子 而且右孩子小于左孩子的值 则定位到右孩子
        if (childIndex + 1 < length && array[childIndex + 1] <
            array[childIndex]){
            childIndex++;
        }
        // 如果父节点小于任何一个孩子的值，则直接跳出
        if (temp <= array[childIndex])
            break;
        // 交换
        array[parentIndex] = array[childIndex];
        parentIndex = childIndex;
        childIndex = 2 * parentIndex + 1;
    }
    array[parentIndex] = temp
}


function  buildHeap(array){
    for(let i = parseInt((array.length - 2)/2); i>=0; i--){
        downAdjust(array, i, array.length)
    }
}

const array = [1,3,2,6,5,7,8,9,10,0];
upAdjust(array);
console.log(array)

const array1 = [7,1,3,10,5,2,8,9,6];
buildHeap(array1);
console.log(array1)
