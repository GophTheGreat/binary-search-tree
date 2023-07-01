const myNode = require('./Node.js');

class Tree {
  constructor(array){
    this.root = this.buildTree(array, 0, array.length - 1);
    this.inorderArray = [];
    this.preorderArray = [];
    this.postorderArray = [];
  }

  //builds the tree
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

  //inserts a value into the binary search tree
  insert(value){
    let cur = this.root;

    console.log(cur.data);
    //if tree is empty, make a root for it.
    if (cur === null){
      this.root = new myNode(value);
    }

    while(cur !== null){;
      //if value < cur.data, walk down the left subtree'
      console.log(`Comparing ${value} to ${cur.data}`)
      if(value <= cur.data){
        if(cur.left !== null){
          console.log(`Walking left`)
          cur = cur.left;
        }
        //if there is no left subtree, insert the node
        else{
          console.log(`Inserting left`)
          cur.left = new myNode(value);
          break;
        }
      }

      //if value > cur.data, walk down the right subree
      if(value > cur.data){
        if(cur.right !== null){
          console.log(`Walking right`)
          cur = cur.right;
        }
        //if there is no right subtree, insert the node
        else{
          console.log(`Inserting right`)
          cur.right = new myNode(value);
          break;
        }
      }
    }
  }

  //deletes a node in the tree
  delete(value){
    let cur = this.root;
    let prev = cur;
    let lastMove;

    console.log(cur.data);
    //if tree is empty, return
    if (cur === null){
      return;
    }

    while(cur !== null){
      //store the previous node as a reference for when we have to stitch up the children
      prev = cur;

      //if value < cur.value, walk down the left subtree
      console.log(`Comparing ${value} to ${cur.data}`)
      if(value < cur.data){
        if(cur.left !== null){
          console.log(`Walking left`)
          cur = cur.left;
          lastMove = 'left'
        }
      }

      //if value > cur.data, walk down the right subree
      if(value > cur.data){
        if(cur.right !== null){
          console.log(`Walking right`)
          cur = cur.right;
          lastMove = 'right'
        }
      }
      //if value is equal, take up the right subtree and replace cur.
      //if no right subree, then take the left subtree
      if(value === cur.data){
        if(cur.right !== null){
          prev[lastMove] = cur.right;
        }
      }
    }
  }

  //searches for a value and returns the node or false;
  find(value){
    let cur = this.root;

    if (cur === null){
      return false;
    }

    while(cur !== null){
      //if value < cur.data, walk down the left subtree'
      console.log(`Comparing ${value} to ${cur.data}`)
      if(value < cur.data){
        if(cur.left !== null){
          console.log(`Walking left`)
          cur = cur.left;
        }
        //if there is no left subtree, return false
        else{
          return false;
        }
      }

      //if value > cur.data, walk down the right subree
      if(value > cur.data){
        if(cur.right !== null){
          console.log(`Walking right`)
          cur = cur.right;
        }
        //if there is no right subtree, insert the node
        else{
          return false
        }
      }
      //if value is equal, return the node
      //if no right subree, then take the left subtree
      if(value === cur.data){
        return cur;
      }
    }
  }

  levelOrder(order){

  }

  //traverses the tree in inorder fashion
  inorder(node, func){
    let cur = node;

    this.inorderArray = [];

    //If no node, return nothing
    if(!node){
      return [];
    }

    //if there's a left, traverse the left
    if(cur.left){
      this.inorder(cur.left)
    }

    //Report or perform a function on the current node
    if(func){
      func(cur)
    }
    else{
      this.inorderArray.push(cur.data)
    }

    //if there's a right, traverse the right
    if(cur.right){
      this.inorder(cur.right)
    }
    
    return this.inorderArray;
  }

  //traverses the tree in preorder fashion
  preorder(node, func){
    let cur = node;

    this.preorderArray = [];
    
    //If no node, return nothing
    if(!node){
      return [];
    }

    //Report or perform a function on the current node
    if(func){
      func(cur)
    }
    else{
      this.preorderArray.push(cur.data)
    }

    //if there's a left, traverse the left
    if(cur.left){
      this.preorder(cur.left)
    }

    //if there's a right, traverse the right
    if(cur.right){
      this.preorder(cur.right)
    }
    
    return this.preorderArray;
  }

  //traverses the tree in postorder fashion
  postorder(node, func){
    let cur = node;

    this.postorderArray = [];
    
    //If no node, return nothing
    if(!node){
      return [];
    }
    
    //if there's a left, traverse the left
    if(cur.left){
      this.postorder(cur.left)
    }

    //if there's a right, traverse the right
    if(cur.right){
      this.postorder(cur.right)
    }
    
    //Report or perform a function on the current node
    if(func){
      func(cur)
    }
    else{
      this.postorderArray.push(cur.data)
    }

    return this.postorderArray;
  }



//Update height of the current node by adding 1 to the maximum of the two heights obtained in the previous step. Store the height in a variable, say ans.
//If the current node is equal to the given node K, print the value of ans as the required answer.
  
  //returns the height of the target node
  height(node){
    
    let height = 0;
    
    // If the tree is empty, print -1.
    if(tree.root === null){
      return -1;
    }
    //Otherwise, perform the following steps:
    //Calculate the height of the left subtree recursively.
    //Calculate the height of the right subtree recursively.
    height = Math.max(height(node.left), height(node.right)) + 1;
    
    return height;
  }


}



const ascending = (a, b) => {
  return a - b;
}

module.exports = {Tree, ascending};

