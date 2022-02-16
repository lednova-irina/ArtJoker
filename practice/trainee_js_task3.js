"use strict";

// 1.Написать свою реализацию бинарного дерева поиска. (Возможности структуры данных должны быть: Добавить
// новый элемент, удалить элемент, найти элемент по его значению)

class BinaryNode {
  constructor(rootValue) {
    this.root = rootValue;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value === this.root) {
      this.root = value;
    }
    if (value < this.root) {
      this.left = this.#insertNode(this.left, value);
    } else if (value > this.root) {
      this.right = this.#insertNode(this.right, value);
    }
  }

  #insertNode(node, value) {
    let resultNode = node;
    if (resultNode instanceof BinaryNode) {
      resultNode.insert(value);
    } else {
      resultNode = new BinaryNode(value);
    }
    return resultNode;
  }

  search(value) {
    if (value < this.root) {
      this.left = this.#searchNode(this.left, value);
      return this.left;
    } else if (value > this.root) {
      this.right = this.#searchNode(this.right, value);
      return this.right;
    }
  }

  #searchNode(node, value) {
    let resultNode = node;
    if (!resultNode) {
      throw new Error("Node is null");
    }
    if (resultNode.root !== value) {
      return resultNode.search(value);
    }
    return resultNode;
  }

  remove(value) {
    const nodeToRemove = this.search(value);
    if (!nodeToRemove) {
      throw new Error("Node is null");
    }

    if (!nodeToRemove.left && !nodeToRemove.right) {
      return this.#buildNewNode(nodeToRemove, null);
    } else if (!nodeToRemove.left) {
      return this.#buildNewNode(nodeToRemove, nodeToRemove.right);
    } else if (!nodeToRemove.right) {
      return this.#buildNewNode(nodeToRemove, nodeToRemove.left);
    } else {
      let newRoot = nodeToRemove.left.getMax() || nodeToRemove.right.getMin();
      return this.#buildNewNode(nodeToRemove, newRoot);
    }
  }

  #buildNewNode(node, root) {
    let nodesArray = node.traverse();
    if (nodesArray.length > 1) {
      for (let i = 0; i < nodesArray.length; i++) {
        if (nodesArray[i] === node.root || nodesArray[i] === root) {
          nodesArray.splice(i--, 1);
        }
      }
    }
    console.log(this);
    node.root = root;
    node.left = null;
    node.right = null;
    if (node.root !== null) {
      for (let i = 0; i < nodesArray.length; i++) {
        this.insert(nodesArray[i]);
      }
    }

    return this;
  }

  traverse() {
    return this.preOrder();
  }

  preOrder() {
    let result = [];
    result.push(this.root);
    if (this.left) {
      preOrder(this.left);
    }
    if (this.right) {
      preOrder(this.right);
    }
    return result;
  }

  getMin() {
    if (this.left instanceof BinaryNode) {
      return this.left.getMin();
    }
    return this.root;
  }
  getMax() {
    if (this.right instanceof BinaryNode) {
      return this.right.getMax();
    }
    return this.root;
  }
}

// 2.Написать сортировку двумя различными методами (Можно выбрать любые методы сортировки, самые простые:
// пузырьковая, выбором)

/* быстрая сортировка*/
Array.prototype.quickSort = function () {
  if (!Array.isArray(this)) {
    throw new Error("Argument should be an array");
  }
  if (this.length < 2) {
    return this;
  }
  const left = [];
  const right = [];
  const middleIndex = Math.round((this.length - 1) / 2);
  const middleValue = this[middleIndex];

  for (let i = 0; i < this.length; i++) {
    if (i !== middleIndex) {
      if (this[i] > middleValue) {
        right.push(this[i]);
      } else {
        left.push(this[i]);
      }
    }
  }
  return [...left.quickSort(), middleValue, ...right.quickSort()];
};

/* сортировка выбором*/
Array.prototype.selectionSort = function(){
    if (!Array.isArray(this)) {
        throw new Error("Argument should be an array");
      }
      for (let i = 0; i < this.length - 1; i++) {
        let indexOfMinValue = i;
        for (let j = i + 1; j < this.length; j++) {
          if (this[j] < this[indexOfMinValue]) {
            indexOfMinValue = j;
          }
        }
        if (indexOfMinValue !== i) {
          [this[i], this[indexOfMinValue]] = [this[indexOfMinValue], this[i]];
        }
      }
      return this;
}



