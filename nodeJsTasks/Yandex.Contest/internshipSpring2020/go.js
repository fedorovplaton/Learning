let Csimple = require('./C2.js');



console.log(Csimple([
  {
    "geometry": [10, 20],
    "text": "James"
  },
  {
    "geometry": [10, 20],
    "text": "cool"
  },
  {
    "geometry": [20, 40],
    "text": "Bond"
  },
  {
    "geometry": [5, 40],
    "text": "Bond"
  },
  {
    "geometry": ['f',4],
    "text": ''
  },
],["James", "Bond", "", 3, {}, true, false, '', 'cool']));

console.log(Csimple([],[]));