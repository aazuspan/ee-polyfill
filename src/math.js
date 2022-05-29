/*
Original code Copyright (c) 2022 Behnam Mohammadi [1]

Licensed under MIT License
Code published to Github at [2]

[1] https://github.com/behnammodi
[2] https://github.com/behnammodi/polyfill/blob/master/math.polyfill.js
*/

/**
 * Math.trunc()
 */
if (!Math.trunc) {
  Math.trunc = function (n) {
    return n < 0 ? Math.ceil(n) : Math.floor(n);
  };
}

/**
 * Math.sign()
 */
if (!Math.sign) {
  Math.sign = function (x) {
    // If x is NaN, the result is NaN.
    // If x is -0, the result is -0.
    // If x is +0, the result is +0.
    // If x is negative and not -0, the result is -1.
    // If x is positive and not +0, the result is +1.
    return (x > 0) - (x < 0) || +x;
    // A more aesthetic pseudo-representation:
    //
    // ( (x > 0) ? 1 : 0 )  // if x is positive, then positive one
    //          +           // else (because you can't be both - and +)
    // ( (x < 0) ? -1 : 0 ) // if x is negative, then negative one
    //         ||           // if x is 0, -0, or NaN, or not a number,
    //         +x           // then the result will be x, (or) if x is
    //                      // not a number, then x converts to number
  };
}
