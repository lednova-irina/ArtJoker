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
      let rows = matrix.length;
      let cols = matrix[0].length;
      let result = [];

      if (cols != rows) {
        throw new Error("This matrix should be square");
      }

      for (let i = 0; i < rows; i++) {
        result.push(matrix[i][i]);
      }
      return result;
    },
    getBelowDiagonal: function (matrix) {
      let rows = matrix.length;
      let cols = matrix[0].length;
      let result = [];

      if (cols != rows) {
        throw new Error("This matrix should be square");
      }
      for (let i = 1; i < rows; i++) {
        result.push(matrix[i][i - 1]);
      }
      return result;
    },
    getAboveDiagonal: function (matrix) {
      let rows = matrix.length;
      let cols = matrix[0].length;
      let result = [];

      if (cols != rows) {
        throw new Error("This matrix should be square");
      }
      for (let i = 0; i < rows - 1; i++) {
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

      let resultArr = [];
      for (let i = 0; i < str.length; i++) {
        resultArr.push(str[i]);
      }
      return resultArr;
    },
    customSort: function (str) {
      return Utils.Array.arrayToString(
        Utils.Array.sortArrayAsc(Utils.String.stringToArray(str))
      );
    },
    customSplit: function (str, separator, limit) {
      if (typeof str !== "string") {
        throw new Error("Argument should be a string");
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
      let resultStr = "";
      for (let i = 0; i < str.length; i++) {
        if (!symbols.includes(str[i])) {
          resultStr += str[i];
        }
      }
      return resultStr;
    },
    removeSymbolsRegex: function (str, regex) {
      return str.replace(regex, "");
    },
    reverse: function (str) {
      let reverseStr = "";

      for (let i = str.length - 1; i >= 0; i--) {
        reverseStr += str[i];
      }
      return reverseStr;
    },
    toWordsArray: function (str) {
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
  Triangle: function (aSide, bSide, cSide) {
    this.a = aSide;
    this.b = bSide;
    this.c = cSide;

    (this.calculateSquare = function () {
      let a = this.a;
      let b = this.b;
      let c = this.c;
      let cos = {
        A: (b * b + c * c - a * a) / (2 * b * c),
        B: (a * a + c * c - b * b) / (2 * a * c),
        C: (a * a + b * b - c * c) / (2 * a * b),
      };

      let angles = {
        A: (Math.acos(cos.A) * 180) / Math.PI,
        B: (Math.acos(cos.B) * 180) / Math.PI,
        C: (Math.acos(cos.C) * 180) / Math.PI,
      };

      let sin = {
        A: Math.sin(angles.A),
        B: Math.sin(angles.B),
        C: Math.sin(angles.C),
      };

      const D = a / sin.A || b / sin.B || c / sin.C;
      const square = D ** 2 * sin.A * sin.B * sin.C;
      return square;
    }),
      (this.calculatePerimeter = function () {
        let a = this.a;
        let b = this.b;
        let c = this.c;
        const perimeter = a + b + c;
        return perimeter;
      });
  },
  Rectangle: function (aSide, bSide) {
    this.a = aSide;
    this.b = bSide;

    this.calculateSquare = function () {
      const square = this.a * this.b;
      return square;
    };
    this.calculatePerimeter = function () {
      const perimeter = 2 * (this.a + this.b);
      return perimeter;
    };
  },
  Circle: function (radius) {
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
  constructor(aSide, bSide, cSide) {
    this.a = aSide;
    this.b = bSide;
    this.c = cSide;
  }
  calculateSquare() {
    let a = this.a;
    let b = this.b;
    let c = this.c;

    let cos = {
      A: (b * b + c * c - a * a) / (2 * b * c),
      B: (a * a + c * c - b * b) / (2 * a * c),
      C: (a * a + b * b - c * c) / (2 * a * b),
    };

    let angles = {
      A: (Math.acos(cos.A) * 180) / Math.PI,
      B: (Math.acos(cos.B) * 180) / Math.PI,
      C: (Math.acos(cos.C) * 180) / Math.PI,
    };

    let sin = {
      A: Math.sin(angles.A),
      B: Math.sin(angles.B),
      C: Math.sin(angles.C),
    };

    const D = a / sin.A || b / sin.B || c / sin.C;
    const square = D ** 2 * sin.A * sin.B * sin.C;
    return square;
  }
  calculatePerimeter() {
    const perimeter = this.a + this.b + this.c;
    return perimeter;
  }
}
class Rectangle {
  constructor(aSide, bSide) {
    this.a = aSide;
    this.b = bSide;
  }
  calculateSquare() {
    const square = this.a * this.b;
    return square;
  }
  calculatePerimeter() {
    const perimeter = 2 * (this.a + this.b);
    return perimeter;
  }
}
class Circle {
  constructor(radius) {
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
      throw new Error("Parameter should be a number");
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
    let resultNegativeBinary = [];
    let resultPositiveBinary = [];
    if (decimalNum < 0) {
      resultPositiveBinary = numberConverter.fromPositiveDecimalToBinary(
        (decimalNum + 1) * -1
      );
    } else {
      throw new Error("Number should be negative");
    }

    for (let item of resultPositiveBinary) {
      if (item === 0) {
        resultNegativeBinary.push(1);
      } else {
        resultNegativeBinary.push(0);
      }
    }
    return resultNegativeBinary;
  },

  fromBinaryToDecimal: function (binaryNum) {
    if (typeof binaryNum !== "string") {
      throw new Error("Parameter should be a string");
    }
    let result = 0;
    let i = 0;
    let n = binaryNum.length - 1;
    while (n >= 0) {
      result += binaryNum[i] * 2 ** n;
      n--;
      i++;
    }
    return result;
  },
};

//12. Пункты 9 и 10 выполнить для двумерных массивов.
function sumElements2D(arr, predicate) {
  let sum = 0;
  for (let i in arr) {
    sum += sumElementsRec(arr[i], predicate);
  }
  return sum;
}

function countElements2D(arr, predicate) {
  let counter = 0;

  for (let i in arr) {
    counter += countElements(arr[i], predicate);
  }
  return counter;
}

//13. Посчитать сумму значений чисел от min до max (всех, только тех которые кратны 3, только положительные).
//Нарисовать блок схему. Реализовать также с помощью рекурсии.
let sumCounter = {
  getSum: function (min, max, predicate) {
    let sum = 0;
    for (let i = min; i <= max; i++) {
      if (predicate(i)) {
        sum += i;
      }
    }
    return sum;
  },

  getSumGen: function* (min, max, predicate) {
    let sum = 0;
    for (let i = min; i <= max; i++) {
      if (predicate(i)) {
        sum += i;
        yield sum;
      }
    }
  },

  getSumRec: function (min, max, predicate, sum = 0) {
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
  let mean = 0;

  for (let i in arr) {
    mean += getMeanOfArray(arr[i], predicate);
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
  const set = new Set();
  let columnIndexToDelete = [];
  for (let row = 0; row < arr.length; row++) {
    for (let column = 0; column < arr[row].length; column++) {
      if (arr[row][column] === 0) {
        set.add(column);
      }
    }
  }
  for (let i of set) {
    columnIndexToDelete.push(i);
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
  const diagonal = predicate(matrix);
  return sumElementsRec(diagonal, () => true);
}

function countZeroMatrixDiagonalElements(matrix, predicate) {
  const diagonal = predicate(matrix);
  return countElements(diagonal, (value) => value === 0);
}

function countMeanMatrixDiagonalElements(matrix, predicate) {
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
    if (limit >= 1) {
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
    return function memoFibonacci(prev, curr, limit) {
      while (limit > 0) {
        if (cache[prev] === undefined) {
          cache[prev] = [prev];
        }
        return [...cache[prev], ...memoFibonacci(curr, prev + curr, limit - 1)];
      }
      return [prev];
    };
  })(),
};

let fibonacciNumbersGen = console.log([
  ...fibonacciNumbers.calcNumbersGenerator,
]);

const fibonacciMemoized = console.log(
  fibonacciNumbers.calcNumbersMemoized(0, 1, 10)
);

//19. Реализовать с помощью итератора и генератора светофор. При каждой следующей итерации мы должны получать следующий корректный цвет по логике светофора.
let semaphoreIterator = {
  colors: ["red", "yellow", "green"],
  limit: 10,
  [Symbol.iterator]() {
    return {
      semaphoreColors: this.colors,
      iterations: this.limit,
      switcher: 0,
      i: 0,
      next() {
        while (this.iterations) {
          this.iterations--;
          this.i += this.switcher;
          if (this.i == 2) {
            this.switcher = -1;
          }
          if (this.i == 0) {
            this.switcher = 1;
          }

          return { value: this.semaphoreColors[this.i], done: false };
        }
        return { done: true };
      },
    };
  },
};

function* semaphore(iterations) {
  const colors = ["red", "yellow", "green"];
  let switcher = 0;
  let i = 0;
  while (iterations) {
    iterations--;
    i += switcher;
    if (i == 2) {
      switcher = -1;
    }
    if (i == 0) {
      switcher = 1;
    }

    yield colors[i];
  }
}

//20. Определить является ли число отрицательным или положительным без сравнения на больше/меньше нуля.
//Посчитать количество битов числа которые установлены в единицу и которые установлены в 0. Написать свою реализацию для ~, двумя способами.
function bitwiseNotV1(decimalNumber) {
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
  if (number >> 31 === -1) {
    return false;
  }
  return true;
}

function isNegative(number) {
  if (number >> 31 === -1) {
    return false;
  }
  return true;
}

function count1s(decimalNumber) {
  let binaryNumber;
  if (decimalNumber > 0) {
    binaryNumber = numberConverter.fromPositiveDecimalToBinary(decimalNumber);
  } else {
    binaryNumber = numberConverter.fromNegativeDecimalToBinary(decimalNumber);
  }
  if (binaryNumber === 1) {
    return binaryNumber;
  }
  let count = 0;
  for (let i = 0; i <= binaryNumber.length; i++) {
    if (binaryNumber[i] === 1) {
      count++;
    }
  }
  return count;
}

function count0s(number) {
  let binaryNumber;
  if (number > 0) {
    binaryNumber = numberConverter.fromPositiveDecimalToBinary(number);
  } else {
    binaryNumber = numberConverter.fromNegativeDecimalToBinary(number);
  }
  if (binaryNumber === 0) {
    return binaryNumber;
  }
  let count = 0;
  for (let i = 0; i <= binaryNumber.length; i++) {
    if (binaryNumber[i] === 0) {
      count++;
    }
  }
  return count;
}
