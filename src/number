/*
Original code Copyright (c) 2022 Behnam Mohammadi [1]

Licensed under MIT License
Code published to Github at [2]

[1] https://github.com/behnammodi
[2] https://github.com/behnammodi/polyfill/blob/master/number.polyfill.js
*/

/**
 * Number.isInteger()
 */
if (!Number.isInteger) {
  Number.isInteger = function (value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
}
