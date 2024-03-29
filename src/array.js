/*
Original code Copyright (c) 2022 Behnam Mohammadi [1]

Licensed under MIT License
Code published to Github at [2]

[1] https://github.com/behnammodi
[2] https://github.com/behnammodi/polyfill/blob/master/array.polyfill.js
*/

/**
 * Array.prototype.findLastIndex()
 */
if (!Array.prototype.findLastIndex) {
  Object.defineProperty(Array.prototype, "findLastIndex", {
    value: function (predicate, thisArg) {
      var idx = this.length - 1;
      while (idx >= 0) {
        var value = this[idx];
        if (predicate.call(thisArg, value, idx, this)) {
          return idx;
        }
        idx--;
      }
      return -1;
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

/**
 * Array.prototype.findLast()
 */
if (!Array.prototype.findLast) {
  Object.defineProperty(Array.prototype, "findLast", {
    value: function (predicate, thisArg) {
      var idx = this.length - 1;
      while (idx >= 0) {
        var value = this[idx];
        if (predicate.call(thisArg, value, idx, this)) {
          return value;
        }
        idx--;
      }
      return undefined;
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

/**
 * Array.prototype.at()
 */
if (!Array.prototype.at) {
  Object.defineProperty(Array.prototype, "at", {
    value: function (n) {
      // ToInteger() abstract op
      n = Math.trunc(n) || 0;
      // Allow negative indexing from the end
      if (n < 0) n += this.length;
      // OOB access is guaranteed to return undefined
      if (n < 0 || n >= this.length) return undefined;
      // Otherwise, this is just normal property access
      return this[n];
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

/**
 * Array.prototype.from()
 */
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}

/**
 * Array.prototype.isArray()
 */
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}

/**
 * Array.prototype.of()
 */
if (!Array.of) {
  Array.of = function () {
    return Array.prototype.slice.call(arguments);
  };
}

/**
 * Array.prototype.copyWithin()
 */
if (!Array.prototype.copyWithin) {
  Object.defineProperty(Array.prototype, "copyWithin", {
    configurable: true,
    writable: true,
    value: function (target, start /*, end*/) {
      // Steps 1-2.
      if (this == null) {
        throw new TypeError("this is null or not defined");
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-8.
      var relativeTarget = target >> 0;

      var to =
        relativeTarget < 0
          ? Math.max(len + relativeTarget, 0)
          : Math.min(relativeTarget, len);

      // Steps 9-11.
      var relativeStart = start >> 0;

      var from =
        relativeStart < 0
          ? Math.max(len + relativeStart, 0)
          : Math.min(relativeStart, len);

      // Steps 12-14.
      var end = arguments[2];
      var relativeEnd = end === undefined ? len : end >> 0;

      var final =
        relativeEnd < 0
          ? Math.max(len + relativeEnd, 0)
          : Math.min(relativeEnd, len);

      // Step 15.
      var count = Math.min(final - from, len - to);

      // Steps 16-17.
      var direction = 1;

      if (from < to && to < from + count) {
        direction = -1;
        from += count - 1;
        to += count - 1;
      }

      // Step 18.
      while (count > 0) {
        if (from in O) {
          O[to] = O[from];
        } else {
          delete O[to];
        }

        from += direction;
        to += direction;
        count--;
      }

      // Step 19.
      return O;
    },
  });
}

/**
 * Array.prototype.entries()
 */
if (!Array.prototype.entries) {
  Array.prototype.entries = function () {
    function Iterator() {}

    Iterator.prototype.next = function () {
      if (index > selfThis.length - 1) {
        done = true;
      }
      if (done) {
        return { value: undefined, done: true };
      }
      return { value: [index, selfThis[index++]], done: false };
    };

    var selfThis = this;
    var index = 0;
    var done;

    return new Iterator();
  };
}

/**
 * Array.prototype.fill()
 */
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, "fill", {
    configurable: true,
    writable: true,
    value: function (value) {
      // Steps 1-2.
      if (this == null) {
        throw new TypeError("this is null or not defined");
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k =
        relativeStart < 0
          ? Math.max(len + relativeStart, 0)
          : Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ? len : end >> 0;

      // Step 11.
      var final =
        relativeEnd < 0
          ? Math.max(len + relativeEnd, 0)
          : Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    },
  });
}

/**
 * Array.prototype.find()
 */
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    configurable: true,
    writable: true,
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
  });
}

/**
 * Array.prototype.findIndex()
 */
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    configurable: true,
    writable: true,
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
  });
}

/**
 * Array.prototype.flat()
 */
if (!Array.prototype.flat) {
  Object.defineProperty(Array.prototype, "flat", {
    configurable: true,
    writable: true,
    value: function () {
      var depth =
        typeof arguments[0] === "undefined" ? 1 : Number(arguments[0]) || 0;
      var result = [];
      var forEach = result.forEach;

      var flatDeep = function (arr, depth) {
        forEach.call(arr, function (val) {
          if (depth > 0 && Array.isArray(val)) {
            flatDeep(val, depth - 1);
          } else {
            result.push(val);
          }
        });
      };

      flatDeep(this, depth);
      return result;
    },
  });
}

/**
 * Array.prototype.flatMap()
 */
if (!Array.prototype.flatMap) {
  Object.defineProperty(Array.prototype, "flatMap", {
    configurable: true,
    writable: true,
    value: function () {
      return Array.prototype.map.apply(this, arguments).flat(1);
    },
  });
}

/**
 * Array.prototype.includes()
 */
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    configurable: true,
    writable: true,
    value: function (searchElement, fromIndex) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === "number" &&
            typeof y === "number" &&
            isNaN(x) &&
            isNaN(y))
        );
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    },
  });
}

/**
 * Array.prototype.keys()
 */
if (!Array.prototype.keys) {
  Array.prototype.keys = function () {
    function Iterator() {}

    Iterator.prototype.next = function () {
      if (index > selfThis.length - 1) {
        done = true;
      }
      if (done) {
        return { value: undefined, done: true };
      }
      return { value: index++, done: false };
    };

    var selfThis = this;
    var index = 0;
    var done;

    return new Iterator();
  };
}

/**
 * Array.prototype.values()
 */
if (!Array.prototype.values) {
  Array.prototype.values = function () {
    function Iterator() {}

    Iterator.prototype.next = function () {
      if (index > selfThis.length - 1) {
        done = true;
      }
      if (done) {
        return { value: undefined, done: true };
      }
      return { value: selfThis[index++], done: false };
    };

    var selfThis = this;
    var index = 0;
    var done;

    return new Iterator();
  };
}
