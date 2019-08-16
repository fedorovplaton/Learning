function printCheck(_array, _function) {
    document.write("<pre>    Сортируемвый массив: " + _array.join(" ") + "<\/pre>");
    document.write("<pre>    Результат:           " + _function(_array).join(" ") + "<\/pre>");
}
function arraysSortingChecker(sortFunctionName) {
    document.write("Проверка на работоспособноть сортировки " + sortFunctionName.name + "<\/br>");
    var array = [2, 3, 4, 6, 1, 0, 10, 15, -2, -6, 0, 1, 4, 9, 2, 3];
    printCheck(array,sortFunctionName);
    var array2 = [1,1,1,0];
    printCheck(array2,sortFunctionName);
    var array3 = [];
    printCheck(array3,sortFunctionName);
    var array4 = [2];
    printCheck(array4,sortFunctionName);
    var array5 = [0, -1];
    printCheck(array5,sortFunctionName);
}