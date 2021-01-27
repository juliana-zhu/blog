---
title: 二叉树的前中后序遍历
date: 2020-12-01
sidebar: 'auto'
categories:
 - 算法
tags:
 - 栈
 - 算法
 - 二叉树
publish: true
---
## 使用递归
### 前序
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    const res = [];
    const inorder = (root) => {
        if (!root) {
            return;
        }
        res.push(root.val);
        inorder(root.left);
        inorder(root.right);
    }
    inorder(root);
    return res;
};
```
### 中序
```javascript
var inorderTraversal = function(root) {
    const res = [];
    const inorder = (root) => {
        if (!root) {
            return;
        }
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};
```
### 后序
```javascript
var postOrderRecur = function(root) {
    const res = [];
    const inorder = (root) => {
        if (!root) {
            return;
        }
        inorder(root.left);
        inorder(root.right);
        res.push(root.val);
    }
    inorder(root);
    return res;
};
```
## 迭代写法
### 前序
前序是 中左右 的顺序，我们可以从根节点开始逐步遍历到最左侧节点并不断推入当前节点，然后推出一个就判断当前有没有右侧节点，有就把当前节点指向右侧节点并继续上述流程
```javascript
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
```
### 中序
中序遍历是 左中右 的顺序，我们可以向左遍历推入左节点直到遍历到树的最左节点，然后依次推出栈，并放到结果里，推出一个就判断有没有右节点，如果有右节点就继续把节点设置为右节点再次循环
```javascript
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
```
### 后序
后序遍历是 左右中 的顺序，同上一样，我们遍历到最左侧的节点后，如果右侧节点有值，则我们应该先输出右侧节点的后序遍历，那么要把当前节点变为右侧节点。如果右侧节点没有值或者右侧节点已经遍历过了，那么才输出当前节点。
```javascript
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
```
