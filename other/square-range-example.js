function square(x) {
  return x * x;
}

function range(start, stop, step) {
  var a = [];
  for (var i = start; i != stop; i += step) {
    a.push(i);
  }
  return a;
}

console.log(range(-10, 12, 2).map(square));
// [ 100, 64, 36, 16, 4, 0, 4, 16, 36, 64, 100 ]
