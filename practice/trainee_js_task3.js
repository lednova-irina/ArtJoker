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
    if (value !== this.root) {
      if (value < this.root) {
        if (this.left instanceof BinaryNode) {
          this.left.insert(value);
        } else {
          this.left = new BinaryNode(value);
        }
      } else {
        if (this.right instanceof BinaryNode) {
          this.right.insert(value);
        } else {
          this.right = new BinaryNode(value);
        }
      }
    }
    return this;
  }
  
  insertV1(value) {
    const leafName = this.detectNodeName(value);
    if (leafName === "") {
      return null;
    }
    if (this[leafName] instanceof BinaryNode) {
      this[leafName].insert(value);
    } else {
      this[leafName] = new BinaryNode(value);
    }
  }

  detectNodeName(value) {
    let leafName = "";
    if (value < this.root) {
      leafName = "left";
    }
    if (value > this.root) {
      leafName = "right";
    }
    return leafName;
  }

  search(value) {
    if (this.root === value) {
      return this;
    }

    if (value < this.root) {
      return this.left.search(value);
    }

    if (value > this.root) {
      return this.right.search(value);
    }

    return null;
  }

  /** It's my own remove method */
  remove(value) {
    const nodeToRemove = this.search(value);
    if (!(nodeToRemove instanceof BinaryNode)) {
      return null;
    }

    if (!nodeToRemove.left && !nodeToRemove.right) {
      return this.#buildNewNode(nodeToRemove, null);
    }
    if (!nodeToRemove.left) {
      return this.#buildNewNode(nodeToRemove, nodeToRemove.right);
    }
    if (!nodeToRemove.right) {
      return this.#buildNewNode(nodeToRemove, nodeToRemove.left);
    }
    let newRoot = nodeToRemove.right.getMin();
    return this.#buildNewNode(nodeToRemove, newRoot);
  }

  #buildNewNode(node, root) {
    let nodesArray = node.preOrderTraverse();
    if (nodesArray.length > 1) {
      for (let i = 0; i < nodesArray.length; i++) {
        if (nodesArray[i] === node.root || nodesArray[i] === root) {
          nodesArray.splice(i--, 1);
        }
      }
    }
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

  preOrderTraverse() {
    let result = [];
    result.push(this.root);
    if (this.left) {
      result.push(...this.left.preOrderTraverse());
    }
    if (this.right) {
      result.push(...this.right.preOrderTraverse());
    }
    return result;
  }

  classicRemove(value) {
    if (value < this.root) {
      this.left = this.left.classicRemove(value);
      return this;
    } else if (value > this.root) {
      this.right = this.right.classicRemove(value);
      return this;
    }

    if (!this.left && !this.right) {
      return null;
    }
    if (!this.left) {
      return this.right;
    }
    if (!this.right) {
      return this.left;
    }

    let newNode = this.right.getMin();
    this.root = newNode.root;
    this.right = this.right.classicRemove(newNode.root);

    return this;
  }

  getMin() {
    if (this.left instanceof BinaryNode) {
      return this.left.getMin();
    }
    return this;
  }

  getMax() {
    if (this.right instanceof BinaryNode) {
      return this.right.getMax();
    }
    return this;
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

Array.prototype.quickSortWithPredicate = function (predicate) {
  if (!Array.isArray(this)) {
    throw new Error("Argument should be an array");
  }
  if (this.length < 2) {
    return this;
  }
  const left = [];
  const right = [];
  const middleIndex = Math.round((this.length - 1) / 2);

  for (let i = 0; i < this.length; i++) {
    if (this[i] !== this[middleIndex]) {
      if (predicate(this[i], this[middleIndex])) {
        right.push(this[i]);
      } else {
        left.push(this[i]);
      }
    }
  }
  return [
    ...left.quickSort(predicate),
    this[middleIndex],
    ...right.quickSort(predicate),
  ];
};
// predicate: (a, b) => (a.a > b.a ? true : false)

/* сортировка выбором*/
Array.prototype.selectionSort = function () {
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
};

Array.prototype.selectionSortWithPredicate = function (predicate) {
  if (!Array.isArray(this)) {
    throw new Error("Argument should be an array");
  }
  for (let i = 0; i < this.length - 1; i++) {
    let indexOfMinValue = i;
    for (let j = i + 1; j < this.length; j++) {
      if (predicate(this[j], this[indexOfMinValue])) {
        indexOfMinValue = j;
      }
    }
    if (indexOfMinValue !== i) {
      [this[i], this[indexOfMinValue]] = [this[indexOfMinValue], this[i]];
    }
  }
  return this;
};
// predicate: (a, b) => (a.a < b.a ? true : false)
