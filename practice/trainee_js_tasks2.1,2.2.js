// 1.Написать свою реализацию функций bind, call. Новая реализация должна по функционалу работать аналогично
//как и соответствующие стандартные функции. Без использования стандартных функций.

function customBind(boundTargetFunction, boundThis, ...boundArguments) {
  return (function (...args) {
    let uniqueKey = Symbol();
    boundThis[uniqueKey] = boundTargetFunction;
    const result = boundThis[uniqueKey](...boundArguments.concat(args));
    delete boundThis[uniqueKey];
    return result;
  })();
}

function customCall(boundTargetFunction, boundThis, ...boundArguments) {
  let uniqueKey = Symbol();
  boundThis[uniqueKey] = boundTargetFunction;
  const result = boundThis[uniqueKey](...boundArguments);
  delete boundThis[uniqueKey];
  return result;
}

function customApply(boundTargetFunction, boundThis, boundArguments) {
  let uniqueKey = Symbol();
  boundThis[uniqueKey] = boundTargetFunction;
  const result = boundThis[uniqueKey](boundArguments);
  delete boundThis[uniqueKey];
  return result;
}

// 2.Написать свою реализацию функций для работы с массивами, которые являются аналогами следующих функций:
//map, filter, reduce, find, forEach. Без использования стандартных функций.
Array.prototype.customMap = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Argument should be a function");
  }
  let result = [];
  for (let i = 0; i < this.length; i++) {
    let item = callback(this[i], i, this);
    result.push(item);
  }
  return result;
};

Array.prototype.customFilter = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Argument should be a function");
  }
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.customReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new Error('Argument "callback" should be a function');
  }
  if (typeof initialValue !== "number") {
    throw new Error('Argument "initialValue" should be a number');
  }
  let accumulator = 0;
  for (let i = 0 || initialValue; i < this.length; i++) {
    accumulator += callback(this[i], i, this);
  }
  return accumulator;
};

Array.prototype.customFind = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Argument should be a function");
  }
  let firstFoundElement;
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      firstFoundElement = this[i];
      return firstFoundElement;
    }
  }
  return undefined;
};

Array.prototype.customForEach = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("Argument should be a function");
  }
  for (let i = 0; i < this.length; i++) {
    if (!this[i]) {
      continue;
    }
    callback(this[i], i, this);
  }
};
