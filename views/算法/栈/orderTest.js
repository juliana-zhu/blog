function TreeNode(val, left, right) {
   this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
var preorderTraversal = function(root) {
    let node = root;
    const res = [];
    const stk = [];
    while (node || stk.length) {
        while (node) {
            res.push(node.val);
            stk.push(node);
            node = node.left;
        }
        const curr = stk.pop();
        if(curr.right){
            node = curr.right;
        }
    }
    return res;
};
var inorderTraversal = function(root) {
    let node = root;
    const res = [];
    const stk = [];
    while (node || stk.length) {
        while (node) {
            stk.push(node);
            node = node.left;
        }
        const curr = stk.pop();
        res.push(curr.val);
        if(curr.right){
            node = curr.right;
        }
    }
    return res;
};
var postorderTraversal = function(root) {
    let node = root;
    const res = [];
    const stk = [];
    let prev = null; // 存储上一个遍历过的右侧节点 以此来依据右节点是否遍历过了
    while (node || stk.length) {
        while (node) {
            stk.push(node);
            node = node.left;
        }
        const curr = stk.pop();
        if(!curr.right || curr.right === prev){
            res.push(curr.val);
            prev = curr;
        }else{
            // 如果右侧节点有值 那么把当前节点入栈等下一次再弹出
            stk.push(curr);
            node = curr.right;
        }
    }
    return res;
};
const node4 = new TreeNode(4)
const node5 = new TreeNode(5)
const node2 = new TreeNode(2, node4, node5)
const node6 = new TreeNode(6)
const node3 = new TreeNode(3, null, node6)
const root = new TreeNode(1, node2, node3)
console.log('前序',preorderTraversal(root));
console.log('中序',inorderTraversal(root));
console.log('后序',postorderTraversal(root));
