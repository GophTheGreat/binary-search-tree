const myNode = require('./Node.js');

class Tree {
  constructor(array){
    this.root = this.buildTree(array, 0, array.length - 1);
    this.levelorderArray = [];
  }

  //builds the tree assuming a sorted array
  buildTree(array, start, end){

    if(start === undefined){
      console.log(`setting start`)
      start = 0;
    }
    if(end === undefined){
      end = array.length - 1;
    }

    if(start > end){
      return null;
    }
  
    //then find the middle point and make it the root
    let middle = Math.floor((start + end) / 2);
    let node = new myNode(array[middle]);
  
    //recursively build the left subtree from the start to the mid of the array
    node.left = this.buildTree(array, start, middle - 1);
  
    //recursively build the right subtree from the mid to the end of the array;
    node.right = this.buildTree(array, middle + 1, end)
  
    return node;
  }

  //inserts a value into the binary search tree
  insert(value){
    let cur = this.root;

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


    //if tree is empty, return
    if (cur === null){
      return;
    }

    while(cur !== null){
      console.log(cur.data);
      //store the previous node as a reference for when we have to stitch up the children
      prev = cur;

      //if value < cur.value, walk down the left subtree
      //console.log(`Comparing ${value} to ${cur.data}`)
      if(value < cur.data){
        console.log(`Walking left`)
        cur = cur.left;
        lastMove = 'left';
      }

      //if value > cur.data, walk down the right subree
      if(value > cur.data){
        console.log(`Walking right`)
        cur = cur.right;
        lastMove = 'right';
      }

      if(cur === null){
        break;
      }

      //if value is equal, we have 3 cases
      if(value === cur.data){
        //Case 1
        //If the node is a leaf with no children,
        //Just delete it
        if(cur.left === null && cur.right === null){
          prev[lastMove] = null;
          return;
        }

        //Case 2
        //If the node has 1 child
        //Replace the node with the child
        if((cur.left || cur.right ) && !(cur.left && cur.right)){
          if(cur.left){prev[lastMove] = cur.left;}
          else{prev[lastMOve = cur.right]}
          return;
        }

        //Case 3
        //If the node has 2 children
        //Find the inorder successor, and use that to replace the node
        //Successor will always be leftmost child of the right subtree 
        else{
          let successorParent = null;

          //Find successor
          let successor = cur.right;

          while(successor.left !== null){
            successorParent = successor;
            successor = successor.left
          }
          
          console.log(`cur is ${cur.data}`)
          //console.log(`Successor parent is ${successorParent.data} and successor is ${successor.data}`)
          //Replace the deleted node with the successor
          cur.data = successor.data;
          //Reallocate successor's children 
          //If the successor has no parent, it is the current (target) node's child
          //So just give the current node the successor's child
          if(successorParent === null){
            if(cur.left === null){
              cur.left = successor.left;
            }
            else{
              cur.right = successor.right;
            }
          }

          //Else the successor has a parent
          else{
            console.log(`Successor parent ${successorParent}`)
            if(successorParent.left === successor){
              successorParent.left = successor.left;
            }
            else{
              successorParent.right = successor.right;
            }
          }
          console.log(`Deleted node ${value}`)
          return;
        }
      }
    }
    console.log(`No node of ${value} found`)
    return false;
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

  //traverses the tree in a breadth-first fashion
  levelOrder(order, func){
    this.levelorderArray = [];
    let queue = [];
    let cur = this.root;
    queue.push(cur);
    //while the queue is not empty, insert all the children of the first node into the queue
    while(queue.length > 0){
      if(queue[0].left){queue.push(queue[0].left)}
      if(queue[0].right){queue.push(queue[0].right)}
      
      //also perform the function action if there is one
      //else push the node to an array
      if(func){func(queue[0])}
      else{levelorderArray.push(queue[0])}
      
      //finally remove the first element of the queue
      queue.splice(0,1);
    }
    if(!func){return levelorderArray;}
  }

  //traverses the tree in inorder fashion
  inorder(node, func, array){
    let cur = node;

    if(!array){
      array = [];
    }

    //If no node, return nothing
    if(!node){
      return [];
    }

    //if there's a left, traverse the left
    if(cur.left){
      this.inorder(cur.left, undefined, array)
    }

    //Report or perform a function on the current node
    if(func){
      func(cur)
    }
    else{
      array.push(cur.data)
    }

    //if there's a right, traverse the right
    if(cur.right){
      this.inorder(cur.right, undefined, array)
    }
    
    return array;
  }

  //traverses the tree in preorder fashion
  preorder(node, func, array){
    let cur = node;
    
    if(!array){
      array = [];
    }

    //If no node, return nothing
    if(!node){
      return [];
    }

    //Report or perform a function on the current node
    if(func){
      func(cur)
    }
    else{
      array.push(cur.data)
    }

    //if there's a left, traverse the left
    if(cur.left){
      this.preorder(cur.left, undefined, array)
    }

    //if there's a right, traverse the right
    if(cur.right){
      this.preorder(cur.right, undefined, array)
    }
    
    return array;
  }

  //traverses the tree in postorder fashion
  postorder(node, func, array){
    let cur = node;

    if(!array){
      array = [];
    }
    
    //If no node, return nothing
    if(!node){
      return [];
    }
    
    //if there's a left, traverse the left
    if(cur.left){
      this.postorder(cur.left, undefined, array)
    }

    //if there's a right, traverse the right
    if(cur.right){
      this.postorder(cur.right, undefined, array)
    }
    
    //Report or perform a function on the current node
    if(func){
      func(cur)
    }
    else{
      array.push(cur.data)
    }

    return array;
  }
  
  //returns the height of the target node
  height(node){
    
    let height = 0;
    
    // If the tree is empty, print -1.
    if(node === null){
      return -1;
    }

    //calculate the heights of the left and right subtrees of the node
    //then add 1. That is your height.
    height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    
    return height;
  }

  //returns the depth of the target node
  depth(node){
    //If the node is our root, return depth of 0;
    if(node === this.root){
      return 0;
    }
    
    //else calculate height of the root and height of the node, then subtract rootHeight - nodeHeight
    let rootHeight = height(this.root);
    let nodeHeight = height(node);

    return rootHeight - nodeHeight;
  }

  //returns whether the tree is balanced (height of both sides of the tree differs by less than 1)
  isBalanced(){
    let leftheight = this.height(this.root.left);
    let rightheight = this.height(this.root.right);
    if(Math.abs(leftheight - rightheight) > 1){
      return false;
    }
    else{
      return true;
    }
  }

  //rebalances the tree
  rebalance(){
    this.root = this.buildTree(this.inorder(this.root));
  }
}



const ascending = (a, b) => {
  return a - b;
}

module.exports = {Tree, ascending};

