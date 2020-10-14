module.exports = function (inputData, inputDictionary) {
  inputData = new Array(inputData);
  inputData.sort(function (a, b) {
    return (a.geometry[0] - b.geometry[0]);
  })

  console.log(inputData);

  let answer = inputData.map(item => item.text);

  console.log(answer);

  for (let i = 0; i < answer.length; i++) {
    if (!inputDictionary.indexOf(answer[i]))
      return "Unreadable message";
  }

  return answer.join(" ");
}