module.exports = function (explorers) {
  let map = {}, mapSize = 0;
  explorers.map(item => {
    if(item.length > 0) {
      let name = item[0];
      for (let i = 1; i < item.length; i++) {
        if (map.hasOwnProperty(item[i])) {
          map[item[i]].push(name);
        } else {
          map[item[i]] = [null, name];
          mapSize++;
        }
      }
    }
  });
  let answer = new Array(mapSize), i = 0;
  for (let item in map) {
    map[item][0] = item;
    answer[i++] = map[item];
  }
  return answer;
}