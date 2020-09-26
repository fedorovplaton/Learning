'use strict';

/**
 * Складывает два целых числа
 * @param {Number} a Первое целое
 * @param {Number} b Второе целое
 * @throws {TypeError} Когда в аргументы переданы не числа
 * @returns {Number} Сумма аргументов
 */
function abProblem(a, b) {
  // Ваше решение
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new TypeError(`В аргументы переданы не числа`);
  return a + b;
}

/**
 * Определяет век по году
 * @param {Number} year Год, целое положительное число
 * @throws {TypeError} Когда в качестве года передано не число
 * @throws {RangeError} Когда год – отрицательное значение
 * @returns {Number} Век, полученный из года
 */
function centuryByYearProblem(year) {
  // Ваше решение
  if (typeof year !== "number")
    throw new TypeError(`В качестве года передано не число`);
  if (year < 0)
    throw new RangeError(`Год – отрицательное значение`);
  if (year % 100 === 0)
    return Math.floor(year / 100);
  return Math.floor(year / 100) + 1;
}

/**
 * Переводит цвет из формата HEX в формат RGB
 * @param {String} hexColor Цвет в формате HEX, например, '#FFFFFF'
 * @throws {TypeError} Когда цвет передан не строкой
 * @throws {RangeError} Когда значения цвета выходят за пределы допустимых
 * @returns {String} Цвет в формате RGB, например, '(255, 255, 255)'
 */
function colorsProblem(hexColor) {
  if (typeof hexColor !== 'string')
    throw new TypeError(`Цвет передан не строкой`);
  if (!/#[0-9a-fA-F]{6}/.test(hexColor))
    throw new RangeError(`Значения цвета выходят за пределы допустимых`);

  /**
   * Переводит подстроку hexColor от l до r из 16-теричной системы счисления в 10-теричную
   * @returns {Number} Число в 10-теричной системе
   * @param l {Number} Индекс начала подстроки
   * @param r {Number} Индекс конца подстроки не включая
   */
  function toTenSubString(l, r) {
    return parseInt(hexColor.substring(l, r), 16);
  }

  let a = toTenSubString(1, 3);
  let b = toTenSubString(3, 5);
  let c = toTenSubString(5, 7);

  return `(${a}, ${b}, ${c})`;
}

/**
 * Находит n-ое число Фибоначчи
 * @param {Number} n Положение числа в ряде Фибоначчи
 * @throws {TypeError} Когда в качестве положения в ряде передано не число
 * @throws {RangeError} Когда положение в ряде не является целым положительным числом
 * @returns {Number} Число Фибоначчи, находящееся на n-ой позиции
 */
function fibonacciProblem(n) {
  // Ваше решение
  if (typeof n !== 'number')
    throw new TypeError('В качестве положения в ряде передано не число');
  if (n !== Math.floor(n) || n < 1)
    throw new RangeError('Положение в ряде не является целым положительным числом');

  if (n === 1) return 1;
  if (n === 2) return 1;

  let prev = 1, next = 1;

  for (let i = 3; i <= n; i++) {
    next = next + prev;
    prev = next - prev;
    next = next - prev;
    next = next + prev;
  }

  return next;
}

/**
 * Транспонирует матрицу
 * @param {(Any[])[]} matrix Матрица размерности MxN
 * @throws {TypeError} Когда в функцию передаётся не двумерный массив
 * @returns {(Any[])[]} Транспонированная матрица размера NxM
 */
function matrixProblem(matrix) {
  // Ваше решение
  if (!Array.isArray(matrix))
    throw new TypeError('В функцию передаётся не двумерный массив');
  let l = 0;
  if (!Array.isArray(matrix[0])) {
    throw new TypeError('В функцию передаётся не двумерный массив');
  }
  l = matrix[0].length;
  for (let i = 1; i < matrix.length; i++) {
    if (!Array.isArray(matrix[i]) || matrix[i].length !== l)
      throw new TypeError('В функцию передаётся не двумерный массив');
  }

  let transposedMatrix = new Array(matrix[0].length);
  for (let i = 0; i < matrix[0].length; i++) {
    transposedMatrix[i] = new Array(matrix.length);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }

  return transposedMatrix;
}

/**
 * Переводит число в другую систему счисления
 * @param {Number} n Число для перевода в другую систему счисления
 * @param {Number} targetNs Система счисления, в которую нужно перевести (Число от 2 до 36)
 * @throws {TypeError} Когда переданы аргументы некорректного типа
 * @throws {RangeError} Когда система счисления выходит за пределы значений [2, 36]
 * @returns {String} Число n в системе счисления targetNs
 */
function numberSystemProblem(n, targetNs) {
  // Ваше решение
  if (typeof n !== 'number' || typeof targetNs !== 'number')
    throw new TypeError('Переданы аргументы некорректного типа');
  //if (targetNs < 2 || targetNs > 36)
  //throw new RangeError('Система счисления выходит за пределы значений [2, 36]');
  return n.toString(targetNs);
}

/**
 * Проверяет соответствие телефонного номера формату
 * @param {String} phoneNumber Номер телефона в формате '8–800–xxx–xx–xx'
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Boolean} Если соответствует формату, то true, а иначе false
 */
function phoneProblem(phoneNumber) {
  // Ваше решение
  if (typeof phoneNumber !== 'string')
    throw new TypeError('В качестве аргумента передаётся не строка');

  return (/8-800-[0-9]{3}-[0-9]{2}-[0-9]{2}/g.test(phoneNumber) && phoneNumber.length === 15);
}

/**
 * Определяет количество улыбающихся смайликов в строке
 * @param {String} text Строка в которой производится поиск
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Number} Количество улыбающихся смайликов в строке
 */
function smilesProblem(text) {
  // Ваше решение
  if (typeof text !== 'string')
    throw new TypeError('В качестве аргумента передаётся не строка');

  let matches = text.match(/:-\)|\(-:/g) || [];
  if (matches === null)
    return 0;
  return matches.length;
}

/**
 * Определяет победителя в игре "Крестики-нолики"
 * Тестами гарантируются корректные аргументы.
 * @param {(('x' | 'o')[])[]} field Игровое поле 3x3 завершённой игры
 * @returns {'x' | 'o' | 'draw'} Результат игры
 */
function ticTacToeProblem(field) {
  // Ваше решение
  function columnCheck(i) {
    return (field[0][i] === field[1][i] && field[1][i] === field[2][i]);
  }

  function stringCheck(i) {
    return (field[i][0] === field[i][1] && field[i][1] === field[i][2]);
  }

  if (field[0][0] === field[1][1] && field[1][1] === field[2][2])
    return field[0][0];
  if (field[0][2] === field[1][1] && field[1][1] === field[2][0])
    return field[0][2];

  for (let i = 0; i < 3; i++) {
    if (columnCheck(i)) return field[0][i];
    if (stringCheck(i)) return field[i][0];
  }

  return 'draw'
}

module.exports = {
  abProblem,
  centuryByYearProblem,
  colorsProblem,
  fibonacciProblem,
  matrixProblem,
  numberSystemProblem,
  phoneProblem,
  smilesProblem,
  ticTacToeProblem
};

//  1 -  7 abProblem
//  8 - 14 century
// 15 - 21 colors
// 22 - 32 fibonacci
// 33 - 38 matrix
// 39 - 50 numberSystem
// 51 - 59 phone
// 60 - 67 smile
// 68 - 74 ticTac