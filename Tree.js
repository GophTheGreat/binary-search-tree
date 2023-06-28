const myNode = require('./Node.js');

class Tree {
  constructor(array){
    this.root = this.buildTree(array, 0, array.length - 1);
  }


  buildTree(array, start, end){

    //first sort the array
    //array.sort(ascending) //this would stack overflow so I sort it outside of here now
    if(start > end){
      console.log(`Root case reached`)
      return null;
    }
  
    //then find the middle point and make it the root
    let middle = Math.floor((start + end) / 2);
    let node = new myNode(array[middle]);
  
    console.log(`~~~~~~~~~~`)
    console.log(start)
    console.log(middle)
    console.log(end)
    console.log(`$$$$$$$$$$$$$$`)
  
    //recursively build the left subtree from the start to the mid of the array
    node.left = this.buildTree(array, start, middle - 1);
  
    //recursively build the right subtree from the mid to the end of the array;
    node.right = this.buildTree(array, middle + 1, end)
  
    return node;
  }

  insert(value){
    let cur = this.root;

    //if tree is empty, make a root for it.
    if (cur === null){
      this.root = new myNode(value);
    }

    //compare value to root
    while(cur.value <= value){
      if(cur.left !== null){
        cur = cur.left;
      }
      else{
        cur.left = new myNode(value);
      }
    }
    while(cur.value >= value){
      if(cur.right !== null){
        cur = cur.right;
      }
      else{
        cur.right = new myNode(value);
      }
    }
 }



const ascending = (a, b) => {
  return a - b;
}

module.exports = {Tree, ascending};

