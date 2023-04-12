const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.mainRoot = null;
  }

  add(data) {
    this.mainRoot = addData(this.mainRoot, data);

    function addData(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        node.left = addData(node.left, data);
      } else {
        node.right = addData(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchData(this.mainRoot, data);

    function searchData(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return node.data > data
        ? searchData(node.left, data)
        : searchData(node.right, data);
    }
  }

  find(data) {
    return searchData(this.mainRoot, data);

    function searchData(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return data;
      }

      return node.data > data
        ? searchData(node.left, data)
        : searchData(node.right, data);
    }
  }

  remove(data) {
    return removeData(this.mainRoot, data);

    function removeData(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;

        node.right = removeData(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.mainRoot) {
      return;
    }
    let node = this.mainRoot;

    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    if (!this.mainRoot) {
      return;
    }

    let node = this.mainRoot;
    while (node.right) node = node.right;
    return node.data;
  }

  root() {
    return this.mainRoot.data;
  }
}

module.exports = {
  BinarySearchTree,
};

const tree = new BinarySearchTree();
tree.add(2);
tree.add(7);
tree.add(1);
tree.add(8);
tree.add(4);
tree.add(32);
tree.add(12);
tree.add(14);
console.log(tree.find(8));
