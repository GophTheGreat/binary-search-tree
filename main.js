const {Tree, ascending} = require('./Tree.js');

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//test build
let testarray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
testarray.sort(ascending);
console.log(testarray)
let treeA = new Tree(testarray);

prettyPrint(treeA.root)

//test insert
console.log("TEST INSERT(11)")
treeA.insert(11);
console.log("TEST INSERT(1)")
treeA.insert(1);
console.log("TEST INSERT(7)")
treeA.insert(7);
console.log("TEST INSERT(3333)")
treeA.insert(3333);
prettyPrint(treeA.root)

//test inorder
console.log("TEST INORDER")
let inorderArray = treeA.inorder(treeA.root);
console.log(inorderArray);

//test preorder
console.log("TEST PREORDER")
let preorderArray = treeA.inorder(treeA.root);
console.log(preorderArray);