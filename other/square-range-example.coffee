square = (x) -> x * x

range = (start, stop, step) ->
  (start + x * step for x in [0...(Math.abs(stop-start)/2)])

console.log range(-10, 12, 2).map square
# [ 100, 64, 36, 16, 4, 0, 4, 16, 36, 64, 100 ]
