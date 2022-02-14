"use strict";

// 1.Написать свою реализацию бинарного дерева поиска. (Возможности структуры данных должны быть: Добавить
// новый элемент, удалить элемент, найти элемент по его значению)

class Node {
  constructor(incomeData, left = 0, right = 0) {
    this.data = incomeData;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  insert(data) {
    this.count++;
    const newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  remove(data) {}

  search(data) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data !== data) {
        if (currentNode.data < data) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
      return currentNode;
    }
  }

  size() {
    return this.count;
  }
  getMin() {
    let currentNode = this.root;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }
  getMax() {
    let currentNode = this.root;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
  contains(data) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data === data) {
        return true;
      }
      if (currentNode.data < data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return false;
  }
}

// 2.Написать сортировку двумя различными методами (Можно выбрать любые методы сортировки, самые простые:
// пузырьковая, выбором)
