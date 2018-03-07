import { Fun, id } from "../fun";

let incr = Fun((x: number) => x + 1)
let double = Fun((x: number) => x * 2)
let square = Fun((x: number) => x * x)
let isPositive = Fun((x: number) => x > 0)
let isEven = Fun((x: number) => x % 2 == 0)
let invert = Fun((x: number) => -x)
let squareRoot = Fun((x: number) => Math.sqrt(x))
let ifThenElse =
  function<a, b>(p: Fun<a, boolean>, _then: Fun<a, b>, _else: Fun<a, b>) : Fun<a, b> {
    return Fun((x: a) => {
      if (p.f(x)) {
        return _then.f(x)
      }
      else {
        return _else.f(x)
      }
    })
  }

let positiveAfterIncrement = incr.then(isPositive);  
let positiveAfterIncrementAndDouble = incr.then(double).then(isPositive);
let absSquareRoot = ifThenElse(isPositive, id(), invert).then(squareRoot);
let squareInvertOrSquareRoot = square.then(ifThenElse(isEven, invert, squareRoot));

