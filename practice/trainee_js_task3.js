"use strict";

// 1.Написать свою реализацию бинарного дерева поиска. (Возможности структуры данных должны быть: Добавить
// новый элемент, удалить элемент, найти элемент по его значению)

class Node {
  constructor(incomeData) {
    this.data = incomeData;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.insertNode(this.root, newNode);
  }

  insertNode(currentNode, newNode) {
    while (currentNode) {
      if (newNode.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
        }
        this.insertNode(currentNode.left, newNode);
      }
      if (!currentNode.right) {
        currentNode.right = newNode;
      }
      this.insertNode(currentNode.right, newNode);
    }
  }
  remove() {}
  search() {}
}

const binaryTree = new BinarySearchTree();
binaryTree.insert(8)
binaryTree.insert(5)
binaryTree.insert(10)
binaryTree.insert(81)
binaryTree.insert(6)
binaryTree.insert(58)
binaryTree.insert(88)
binaryTree.insert(2)
console.log(binaryTree)

// 2.Написать сортировку двумя различными методами (Можно выбрать любые методы сортировки, самые простые:
// пузырьковая, выбором)
