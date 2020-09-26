const foo = require('./B. Телефонная книга Аркадия');

function TESTtestCommandName () {
  function compare(a, b) {
    return a === b;
  }

  let tests = [
    ['Создай апап','Создай'],
    ['Удали fgf fgfgf fgf Удали', 'Удали'],
    ['Бла Удали',null],
    ['удали вава',null],
    ['Удал и апап',null],
    ['Созда-й меня',null],
    ['Создай',null],
    ['Удами',null],
  ];

  for (let i = 0; i < tests.length; i++) {
    if(compare(foo.testCommandName(tests[i][0]), tests[i][1]))
      console.log('OK');
    else
      console.log(`Error: [${tests[i][0]}], +: ${tests[i][1]}, -: ${foo.testCommandName(tests[i][0])}`);
  }
}

(() => {
  TESTtestCommandName();
})()