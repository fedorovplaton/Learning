module.exports = function (diffs) {
  let a = 0, b = 0;
  for (let i = 0; i < diffs.length; i++) {
    if (a > 0 && diffs[i][0]) {
      diffs[i][0] *= -1;
    }
    if (b > 0 && diffs[i][1]) {
      diffs[i][1] *= -1;
    }
    a += diffs[i][0];
    b += diffs[i][1];
  }
  if (a !== 0 || b !== 0)
    return null
  return diffs;
}