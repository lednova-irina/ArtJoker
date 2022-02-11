/**
 * Utils START
 */

const Utils = {
  Array: {
    arrayToString: function (arr) {
      if (!Array.isArray(arr)) {
        throw new Error("Argument should be an array");
      }

      let resultStr = "";
      for (let i = 0; i < arr.length; i++) {
        resultStr += arr[i];
      }
      return resultStr;
    },

    sortArrayAsc: function (arr) {
      if (!Array.isArray(arr)) {
        throw new Error("Argument should be an array");
      }

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
          if (arr[j] > arr[j + 1]) {
            let swap = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = swap;
          }
        }
      }
      return arr;
    },
    generateMatrix: function (width, height) {
      if (typeof width !== "number" || height !== "number") {
        throw new Error("Arguments should be numbers");
      }
      const result = [];
      for (let i = 0; i < height; i++) {
        result[i] = [];
        for (let j = 0; j < width; j++) {
          result[i][j] = Math.floor(Math.random() * 10);
        }
      }
      return result;
    },
    getMainDiagonal: function (matrix) {
      if (!Array.isArray(matrix)) {
        throw new Error("Argument should be an array");
      }
      if (matrix.length === 0) {
        throw new Error("Matrix should be not empty");
      }
      let rows = matrix.length;
      let cols = matrix[0].length;
      let result = [];

      if (cols != rows) {
        throw new Error("This matrix should be square");
      }
      if (rows === 0) {
        throw new Error("This matrix is empty");
      }

      for (let i = 0; i < rows; i++) {
        if (typeof matrix[i][i] !== "number") {
          throw new Error("Matrix elements should be numbers");
        }
        result.push(matrix[i][i]);
      }
      return result;
    },
    getBelowDiagonal: function (matrix) {
      if (!Array.isArray(matrix)) {
        throw new Error("Argument should be an array");
      }
      if (matrix.length === 0) {
        throw new Error("Matrix should be not empty");
      }
      let rows = matrix.length;
      let cols = matrix[0].length;
      let result = [];

      if (cols != rows) {
        throw new Error("This matrix should be square");
      }
      if (rows === 0) {
        throw new Error("This matrix is empty");
      }

      for (let i = 1; i < rows; i++) {
        if (typeof matrix[i][i - 1] !== "number") {
          throw new Error("Matrix elements should be numbers");
        }
        result.push(matrix[i][i - 1]);
      }
      return result;
    },
    getAboveDiagonal: function (matrix) {
      if (!Array.isArray(matrix)) {
        throw new Error("Argument should be an array");
      }
      if (matrix.length === 0) {
        throw new Error("Matrix should be not empty");
      }
      let rows = matrix.length;
      let cols = matrix[0].length;
      let result = [];

      if (cols != rows) {
        throw new Error("This matrix should be square");
      }
      if (rows === 0) {
        throw new Error("This matrix is empty");
      }

      for (let i = 0; i < rows - 1; i++) {
        if (typeof matrix[i][i + 1] !== "number") {
          throw new Error("Matrix elements should be numbers");
        }
        result.push(matrix[i][i + 1]);
      }
      return result;
    },
  },

  String: {
    stringToArray: function (str) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
      }
      if (str.length === 0) {
        throw new Error("String should be not empty");
      }
      let resultArr = [];
      for (let i = 0; i < str.length; i++) {
        resultArr.push(str[i]);
      }
      return resultArr;
    },
    customSort: function (str) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
      }
      if (str.length === 0) {
        throw new Error("String should be not empty");
      }
      return Utils.Array.arrayToString(
        Utils.Array.sortArrayAsc(Utils.String.stringToArray(str))
      );
    },

    customSplit: function (str, separator, limit) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
      }
      if (str.length === 0) {
        throw new Error("String should be not empty");
      }
      let outputArr = [];
      let newStr = "";
      let length = str.length - 1;

      for (let i = 0; i <= length; i++) {
        if (separator === "") {
          outputArr.push(str[i]);
        } else if (separator === undefined || separator === null) {
          outputArr.push(str);
          break;
        } else {
          if (str[i] !== separator) {
            newStr += str[i];
            if (i === length) {
              outputArr.push(newStr);
            }
          } else {
            outputArr.push(newStr);
            newStr = "";
          }
        }
      }
      if (limit !== undefined) {
        outputArr.length = limit;
      }
      return outputArr;
    },
    removeSymbols: function (str, ...symbols) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
      }
      if (str.length === 0) {
        throw new Error("String should be not empty");
      }
      let resultStr = "";
      for (let i = 0; i < str.length; i++) {
        if (!symbols.includes(str[i])) {
          resultStr += str[i];
        }
      }
      return resultStr;
    },
    removeSymbolsRegex: function (str, regex) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
      }
      if (str.length === 0) {
        throw new Error("String should be not empty");
      }
      return str.replace(regex, "");
    },
    reverse: function (str) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
      }
      if (str.length === 0) {
        throw new Error("String should be not empty");
      }
      let reverseStr = "";

      for (let i = str.length - 1; i >= 0; i--) {
        reverseStr += str[i];
      }
      return reverseStr;
    },
    toWordsArray: function (str) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
      }
      if (str.length === 0) {
        throw new Error("String should be not empty");
      }
      let punctuationLess = Utils.String.removeSymbolsRegex(
        str,
        /[.,\/#!$%\^&\*;:{}=\-_`~()]/g
      );
      let splitString = Utils.String.customSplit(punctuationLess, " ");
      return splitString.toLowerCase();
    },
  },

  Number: {
    isPrime: function (num) {
      if (typeof num !== "number") {
        throw new Error("Argument should be a number");
      }
      for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
      return num > 1;
    },
  },
};

/**
 * Utils END
 */

// 1. Написать функцию которая проверяет являются две строки анаграммой или нет
function isAnagram(str1, str2) {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new Error("Argument should be a string");
  }
  if (str1.length === 0 || str2.length === 0) {
    throw new Error("String should be not empty");
  }
  let sortStr1 = Utils.String.customSort(str1.toLowerCase());
  let sortStr2 = Utils.String.customSort(str2.toLowerCase());

  return sortStr1 === sortStr2;
}

// 3. Написать функцию которая вычисляет подсчет количество цифр в числе. Реализовать с помощью рекурсии.
function getNumberLength(num, count) {
  if (typeof num !== "number") {
    throw new Error("Argument should be a number");
  }

  let nextNum = Math.floor(num / 10);
  let counter = count || 1;
  if (nextNum > 0) {
    counter++;
    return getNumberLength(nextNum, counter);
  }
  return counter;
}

//4. Реализовать функцию которая проверяет, является ли строка палиндромом
function isPalindrome(string) {
  if (typeof string !== "string") {
    throw new Error("Argument should be a string");
  }

  let incomeStr = Utils.String.removeSymbols(
    string,
    " ",
    ",",
    ".",
    "?",
    "!",
    "-",
    ":",
    ";",
    "'",
    "`"
  );
  let reverseStr = Utils.String.reverse(incomeStr);
  return incomeStr.toLowerCase() == reverseStr.toLowerCase();
}

//5. Написать функцию которая вычисляет подсчет уникальных слов в предложении
function countUniqueWords(str) {
  if (typeof str !== "string") {
    throw new Error("Argument should be a string");
  }
  if (str.length === 0) {
    throw new Error("String should be not empty");
  }
  let cache = countWordsInSentence(str);
  let counter = 0;
  for (let item in cache) {
    if (cache[item] === 1) {
      counter++;
    }
  }
  return counter;
}

//6. Написать функцию которая вычисляет вхождение каждого слова в предложение
function countWordsInSentence(str) {
  if (typeof str !== "string") {
    throw new Error("Argument should be a string");
  }
  if (str.length === 0) {
    throw new Error("String should be not empty");
  }
  let convertedArr = Utils.String.toWordsArray(str);
  let cache = {};

  for (let key of convertedArr) {
    if (cache.hasOwnProperty(key)) {
      cache[key] = cache[key] + 1;
    } else {
      cache[key] = 1;
    }
  }

  return cache;
}

//7. Вычислить периметр и площадь для прямоугольника, треугольника и круга. С помощью конструктора и классов.
const figures = {
  Triangle: function (sideA, sideB, sideC) {
    if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
      throw new Error("Sides size should be above zero");
    }
    if (
      typeof sideA !== "number" ||
      typeof sideB !== "number" ||
      typeof sideC !== "number"
    ) {
      throw new Error("Argument should be a number");
    }
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;

    (this.calculateSquare = function () {
      let sideA = this.sideA;
      let sideB = this.sideB;
      let sideC = this.sideC;
      let cos = {
        sideA:
          (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC),
        sideB:
          (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC),
        sideC:
          (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB),
      };

      let angles = {
        A: (Math.acos(cos.sideA) * 180) / Math.PI,
        B: (Math.acos(cos.sideB) * 180) / Math.PI,
        C: (Math.acos(cos.sideC) * 180) / Math.PI,
      };

      let sin = {
        angleA: Math.sin(angles.A),
        angleB: Math.sin(angles.B),
        angleC: Math.sin(angles.C),
      };

      const diameter =
        sideA / sin.angleA || sideB / sin.angleB || sideC / sin.angleC;
      const square = diameter ** 2 * sin.angleA * sin.angleB * sin.angleC;
      return square;
    }),
      (this.calculatePerimeter = function () {
        let sideA = this.sideA;
        let sideB = this.sideB;
        let sideC = this.sideC;
        const perimeter = sideA + sideB + sideC;
        return perimeter;
      });
  },
  Rectangle: function (width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error("Sides size should be above zero");
    }
    if (typeof width !== "number" || typeof height !== "number") {
      throw new Error("Argument should be a number");
    }
    this.width = width;
    this.height = height;

    this.calculateSquare = function () {
      const square = this.width * this.height;
      return square;
    };
    this.calculatePerimeter = function () {
      const perimeter = 2 * (this.width + this.height);
      return perimeter;
    };
  },
  Circle: function (radius) {
    if (radius <= 0) {
      throw new Error("Radius should be above zero");
    }
    if (typeof radius !== "number") {
      throw new Error("Argument should be a number");
    }
    this.r = radius;

    this.calculateSquare = function () {
      const square = Math.PI * this.r ** 2;
      return square;
    };
    this.calculatePerimeter = function () {
      let diameter = this.r * 2;
      const perimeter = diameter * Math.PI;
      return perimeter;
    };
  },
};

class Triangle {
  constructor(sideA, sideB, sideC) {
    if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
      throw new Error("Sides size should be above zero");
    }
    if (
      typeof sideA !== "number" ||
      typeof sideB !== "number" ||
      typeof sideC !== "number"
    ) {
      throw new Error("Argument should be a number");
    }
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }
  calculateSquare() {
    let sideA = this.sideA;
    let sideB = this.sideB;
    let sideC = this.sideC;

    let cos = {
      sideA:
        (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC),
      sideB:
        (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC),
      sideC:
        (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB),
    };

    let angles = {
      A: (Math.acos(cos.sideA) * 180) / Math.PI,
      B: (Math.acos(cos.sideB) * 180) / Math.PI,
      C: (Math.acos(cos.sideC) * 180) / Math.PI,
    };

    let sin = {
      angleA: Math.sin(angles.A),
      angleB: Math.sin(angles.B),
      angleC: Math.sin(angles.C),
    };

    const D = sideA / sin.angleA || sideB / sin.angleB || sideC / sin.angleC;
    const square = D ** 2 * sin.angleA * sin.angleB * sin.angleC;
    return square;
  }
  calculatePerimeter() {
    const perimeter = this.sideA + this.sideB + this.sideC;
    return perimeter;
  }
}
class Rectangle {
  constructor(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error("Sides size should be above zero");
    }
    if (typeof width !== "number" || typeof height !== "number") {
      throw new Error("Argument should be a number");
    }
    this.width = width;
    this.height = height;
  }
  calculateSquare() {
    const square = this.width * this.height;
    return square;
  }
  calculatePerimeter() {
    const perimeter = 2 * (this.width + this.height);
    return perimeter;
  }
}
class Circle {
  constructor(radius) {
    if (radius <= 0) {
      throw new Error("Radius should be above zero");
    }
    if (typeof radius !== "number") {
      throw new Error("Argument should be a number");
    }
    this.r = radius;
  }
  calculateSquare() {
    const square = Math.PI * this.r ** 2;
    return square;
  }
  calculatePerimeter() {
    let diameter = this.r * 2;
    const perimeter = diameter * Math.PI;
    return perimeter;
  }
}

//8. Вычислить факториал числа. Реализовать с помощью рекурсии. Реализовать мемоизированную функцию вычисления факториала.
const factorial = {
  calcFactorial: function (num) {
    if (typeof num !== "number") {
      throw new Error("Argument should be a number");
    }
    if (!num || num < 0) {
      return 0;
    }
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result = i * result;
    }
    return result;
  },

  calcFactorialRec: function (num, result = 0) {
    if (typeof num !== "number") {
      throw new Error("Argument should be a number");
    }
    if (!num || num < 0) {
      return result;
    } else {
      result = result || 1;
      return this.calcFactorialRec(num - 1, result * num);
    }
  },

  calcFactorialMemo: (function () {
    let cache = {};
    return function fact(num) {
      if (typeof num !== "number") {
        throw new Error("Argument should be a number");
      }
      if (num === 0) {
        return 1;
      } else {
        if (cache[num] === undefined) {
          cache[num] = fact(num - 1);
        }
        return cache[num] * num;
      }
    };
  })(),
};

//9. Посчитать сумму всех элементов массива, только тех которые (Кратные двум, кратные трем, которые только положительные и нечетные),
//реализовать с помощью рекурсии для одномерного массива.
function sumElementsRec(arr, predicate, sum = 0, index = 0) {
  if (index < arr.length) {
    if (predicate(arr[index])) {
      sum += arr[index];
    }
    return sumElementsRec(arr, predicate, sum, ++index);
  }
  return sum;
}

/*
  case1:(value) => value % 2 === 0)
  case2:(value) => value % 3 === 0)
  case3:(value) => value > 0)
  case4:(value) => value % 2 !== 0)
  
  */

//10. Посчитать количество элементов массива которые (Нулевые, отрицательные, положительные, простые числа)
function countElements(arr, predicate) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  let counter = 0;

  for (let item in arr) {
    if (predicate(arr[item])) {
      counter++;
    }
  }
  return counter;
}

/*
case1:(value) => value === 0)
case2:(value) => value < 0)
case3:(value) => value > 0)
case4:(value) => Utils.Number.isPrime(value)
*/

//11. Написать функции которые преобразовывают число из десятичной системы счисления в двоичную и в обратную сторону.
//(Достаточно написать для целых положительных чисел)
const numberConverter = {
  fromPositiveDecimalToBinary: function (decimalNum) {
    if (typeof decimalNum !== "number" || decimalNum < 0) {
      throw new Error("Parameter should be a positive number");
    }
    let resultPositiveBinary = [];
    let next = decimalNum;
    let arrWithIntNumber = [];
    while (next > 0) {
      let bit = next % 2;
      next = Math.floor(next / 2);
      arrWithIntNumber.push(bit);
    }
    for (let i = 32 - arrWithIntNumber.length; i > 0; i--) {
      resultPositiveBinary.push(0);
    }

    for (let item of arrWithIntNumber.reverse()) {
      resultPositiveBinary.push(item);
    }

    return resultPositiveBinary;
  },

  fromNegativeDecimalToBinary: function (decimalNum) {
    if (typeof decimalNum !== "number") {
      throw new Error("Argument should be a number");
    }
    let resultNegativeBinary = [];
    let resultPositiveBinary = [];
    if (decimalNum > 0) {
      throw new Error("Number should be negative");
    }
    resultPositiveBinary = numberConverter.fromPositiveDecimalToBinary(
      -(decimalNum + 1)
    );

    for (let item of resultPositiveBinary) {
      if (item === 0) {
        resultNegativeBinary.push(1);
      }
      resultNegativeBinary.push(0);
    }
    return resultNegativeBinary;
  },

  /*
    fromNegativeDecimalToBinary: function (decimalNum) {
      let resultNegativeBinary = [];
      let stringWithNegativeBinery = (decimalNum >>> 0).toString(2);

      for (let i = 0; i < stringWithNegativeBinery.length; i++) {
        resultNegativeBinary.push(stringWithNegativeBinery[i]);
      }
      return resultNegativeBinary;
    },

  }
  */

  fromBinaryToDecimal: function (binaryNum) {
    if (typeof binaryNum !== "string") {
      throw new Error("Parameter should be a string");
    }
    let result = 0;
    let index = 0;
    let num = binaryNum.length - 1;
    while (num >= 0) {
      result += binaryNum[index] * 2 ** num;
      num--;
      index++;
    }
    return result;
  },
};

//12. Пункты 9 и 10 выполнить для двумерных массивов.
function sumElements2D(arr, predicate) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  let sum = 0;
  for (let item in arr) {
    sum += sumElementsRec(arr[item], predicate);
  }
  return sum;
}

function countElements2D(arr, predicate) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  let counter = 0;

  for (let item in arr) {
    counter += countElements(arr[item], predicate);
  }
  return counter;
}

//13. Посчитать сумму значений чисел от min до max (всех, только тех которые кратны 3, только положительные).
//Нарисовать блок схему. Реализовать также с помощью рекурсии.
let sumCounter = {
  getSum: function (min, max, predicate) {
    if (typeof min !== "number" || typeof max !== "number") {
      throw new Error("Parameters min and max should be a number");
    }
    let sum = 0;
    for (let i = min; i <= max; i++) {
      if (predicate(i)) {
        sum += i;
      }
    }
    return sum;
  },

  getSumGen: function* (min, max, predicate) {
    if (typeof min !== "number" || typeof max !== "number") {
      throw new Error("Parameters min and max should be a number");
    }
    let sum = 0;
    for (let i = min; i <= max; i++) {
      if (predicate(i)) {
        sum += i;
        yield sum;
      }
    }
  },

  getSumRec: function (min, max, predicate, sum = 0) {
    if (typeof min !== "number" || typeof max !== "number") {
      throw new Error("Parameters min and max should be a number");
    }
    let num = min;
    if (num <= max) {
      if (predicate(num)) {
        sum += num;
      }
      return sumCounter.getSumRec(num + 1, max, predicate, sum);
    }
    return sum;
  },
};
/*
   case1:(value) => value)
   case2:(value) => value % 3 === 0)
   case3:(value) => value > 0)
   */

//14. Найти среднее значение всех элементов одномерного/двумерного массива (Среднее только тех которые четные и которые не четные).
function getMeanOfArray(arr, predicate) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  let sum = 0;
  let elementsAmount = 0;

  for (let i in arr) {
    if (predicate(arr[i])) {
      sum += arr[i];
      elementsAmount++;
    }
  }
  return sum / elementsAmount;
}

function getMeanOf2DArray(arr, predicate) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  let mean = 0;

  for (let item in arr) {
    mean += getMeanOfArray(arr[item], predicate);
  }
  return mean;
}
/*
case1:(value) => value)
case2:(value) => value % 2 === 0)
case3:(value) => value % 2 !== 0)
*/

//15. Транспонировать матрицу, сложить две матрицы.
const matrix1 = Utils.Array.generateMatrix(4, 4);
const matrix2 = Utils.Array.generateMatrix(4, 4);

function transposeMatrix(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      result[j] = result[j] || [];
      result[j][i] = arr[i][j];
    }
  }
  return result;
}

function sumMatrix(matrix1, matrix2) {
  if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
    throw new Error("Argumentst should be an array");
  }
  let rows = matrix1.length;
  let cols = matrix1[0].length;
  let result = [];

  if (cols != rows) {
    return false;
  }

  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }
  return result;
}

//16. Удалить из двумерного массива строку в которой присутствует хотя бы один нулевой элемент. Для столбца аналогично реализовать.
function deleteRowsWithZeroEl(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  let result = arr;
  for (let i = 0; i < arr.length; i++) {
    const isContainZero = result[i].some((element) => element === 0);
    if (isContainZero) {
      result.splice(i--, 1);
    }
  }
  return result;
}

/*function deleteRowsWithZeroEl(arr) {
  const rowIndexesToSave = [];
  for (let i = 0; i < arr.length; i++) {
      const isContainZero = arr[i].some((element) => element === 0);

      if (!isContainZero) {
          rowIndexesToSave.push(i);
      }
  }
  const result = [];
  for (let j = 0; j < rowIndexesToSave.length; j++) {
      const rowIndex = rowIndexesToSave[j];
      result.push(arr[rowIndex]);
  }
  return result;
}

);*/

function deleteColumnsWithZeroEl(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument should be an array");
  }
  const set = new Set();
  let columnIndexToDelete = [];
  for (let row = 0; row < arr.length; row++) {
    for (let column = 0; column < arr[row].length; column++) {
      if (arr[row][column] === 0) {
        set.add(column);
      }
    }
  }
  for (let item of set) {
    columnIndexToDelete.push(item);
  }
  Utils.Array.sortArrayAsc(columnIndexToDelete);
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push([]);
    for (let j = 0; j < arr[i].length; j++) {
      if (columnIndexToDelete.includes(j)) {
        continue;
      }
      result[i].push(arr[i][j]);
    }
  }
  return result;
}

/*function deleteColumnsWithZeroEl(arr) {
  let transMatrix = transposeMatrix(arr);
  let matrixWithoutZeroRows = deleteRowsWithZeroEl(transMatrix);
  let result = transposeMatrix(matrixWithoutZeroRows);

  return result;
}
*/

//17. Посчитать сумму/количество нулевых элементов/среднее значение элементов матрицы над и под главной диагональю и на главной диагональю.
function sumMatrixDiagonalElements(matrix, predicate) {
  if (!Array.isArray(matrix)) {
    throw new Error("Argument should be an array");
  }
  const diagonal = predicate(matrix);
  return sumElementsRec(diagonal, () => true);
}

function countZeroMatrixDiagonalElements(matrix, predicate) {
  if (!Array.isArray(matrix)) {
    throw new Error("Argument should be an array");
  }
  const diagonal = predicate(matrix);
  return countElements(diagonal, (value) => value === 0);
}

function countMeanMatrixDiagonalElements(matrix, predicate) {
  if (!Array.isArray(matrix)) {
    throw new Error("Argument should be an array");
  }
  const diagonal = predicate(matrix);
  return getMeanOfArray(diagonal, () => true);
}

//18. Создать итерируемый объект, который на каждой итерации возвращает следующее значение числа фибоначчи
//(Реализовать с помощью итератора и генератора). Реализовать мемоизированную функцию. Реализовать с помощью рекурсии

const fibonacciNumbers = {
  // Генератор
  calcNumbersGenerator: {
    min: 0,
    max: 10,
    *[Symbol.iterator]() {
      let previousNum = 0;
      let currentNum = 1;
      for (let i = this.min; i <= this.max; i++) {
        let sum = previousNum + currentNum;
        previousNum = currentNum;
        currentNum = sum;
        yield currentNum - previousNum;
      }
    },
  },

  // Рекурсивная функция вычисления чисел фибоначчи.
  calcNumbersRecursion: function (prev, curr, limit) {
    if (
      typeof prev !== "number" ||
      typeof curr !== "number" ||
      typeof limit !== "number"
    ) {
      throw new Error("Parameters min and max should be a number");
    }
    if (limit > 0) {
      return [
        prev,
        ...fibonacciNumbers.calcNumbersRecursion(curr, prev + curr, limit - 1),
      ];
    }
    return [prev];
  },

  // Мемоизированная функция высшего порядка для вычисления чисел фибоначчи.

  calcNumbersMemoized: (function () {
    let cache = {};
    return function memoFibonacci(limit) {
      if (typeof limit !== "number") {
        throw new Error("Parameters min and max should be a number");
      }
      if (limit <= 1) {
        return (cache[limit] = limit);
      }
      if (limit in cache) {
        return cache[limit];
      }
      cache[limit] = memoFibonacci(limit - 1) + memoFibonacci(limit - 2);
      return cache[limit];
    };
  })(),
};

//19. Реализовать с помощью итератора и генератора светофор. При каждой следующей итерации мы должны получать следующий корректный цвет по логике светофора.
let semaphoreIterator = {
  colors: ["red", "yellow", "green"],
  limit: 10,
  [Symbol.iterator]() {
    return {
      semaphoreColors: this.colors,
      iterations: this.limit,
      switcher: 0,
      index: 0,
      next() {
        while (this.iterations) {
          this.iterations--;
          this.index += this.switcher;
          if (this.index == 2) {
            this.switcher = -1;
          }
          if (this.index == 0) {
            this.switcher = 1;
          }

          return { value: this.semaphoreColors[this.index], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

function* semaphore(iterations) {
  if (typeof iterations !== "number") {
    throw new Error("Parameters min and max should be a number");
  }
  const colors = ["red", "yellow", "green"];
  let switcher = 0;
  let index = 0;
  while (iterations) {
    iterations--;
    index += switcher;
    if (index == 2) {
      switcher = -1;
    }
    if (index == 0) {
      switcher = 1;
    }

    yield colors[index];
  }
}

//20. Определить является ли число отрицательным или положительным без сравнения на больше/меньше нуля.
//Посчитать количество битов числа которые установлены в единицу и которые установлены в 0. Написать свою реализацию для ~, двумя способами.
function bitwiseNotV1(decimalNumber) {
  if (typeof decimalNumber !== "number") {
    throw new Error("Parameters min and max should be a number");
  }
  let binaryNumber;
  let result = [];
  if (decimalNumber > 0) {
    binaryNumber = numberConverter.fromPositiveDecimalToBinary(decimalNumber);
  } else {
    binaryNumber = numberConverter.fromNegativeDecimalToBinary(decimalNumber);
  }
  for (let item of binaryNumber) {
    if (item === 0) {
      result.push(1);
    } else {
      result.push(0);
    }
  }
  return result;
}

function bitwiseNotV2(decimalNumber) {
  if (typeof decimalNumber !== "number") {
    throw new Error("Parameters min and max should be a number");
  }
  let binaryNumber;
  let result = [];
  if (decimalNumber > 0) {
    binaryNumber = numberConverter.fromPositiveDecimalToBinary(decimalNumber);
  } else {
    binaryNumber = numberConverter.fromNegativeDecimalToBinary(decimalNumber);
  }
  for (let item of binaryNumber) {
    result.push(item ^ 1);
  }
  return result;
}

function isPositive(number) {
  if (typeof number !== "number") {
    throw new Error("Parameters min and max should be a number");
  }
  if (number >> 31 === 0) {
    return false;
  }
  return true;
}

function countDigitInNumber(decimalNumber, marker) {
  if (typeof decimalNumber !== "number" || typeof marker !== "number") {
    throw new Error("Parameters min and max should be a number");
  }
  let binaryNumber;
  let count = 0;

  if (decimalNumber > 0) {
    binaryNumber = numberConverter.fromPositiveDecimalToBinary(decimalNumber);
  } else {
    binaryNumber = numberConverter.fromNegativeDecimalToBinary(decimalNumber);
  }

  if (binaryNumber === 1) {
    return binaryNumber;
  } else {
    for (let i = 0; i <= binaryNumber.length; i++) {
      if (binaryNumber[i] === marker) {
        count++;
      }
    }
  }
  return count;
}
/*
case1: marker=1
case2: marker=0
*/
