/*
Original code Copyright (c) 2022 Behnam Mohammadi [1]

Licensed under MIT License
Code published to Github at [2]

[1] https://github.com/behnammodi
[2] https://github.com/behnammodi/polyfill/blob/master/string.polyfill.js
*/

/**
 * String.prototype.at()
 */
if (!String.prototype.at) {
  Object.defineProperty(String.prototype, "at", {
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
 * String.fromCodePoint()
 */
if (!String.fromCodePoint) {
  var stringFromCharCode = String.fromCharCode;
  var floor = Math.floor;
  Object.defineProperty(String, "fromCodePoint", {
    configurable: true,
    writable: true,
    value: function () {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;
      if (!length) {
        return "";
      }
      var result = "";
      while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (
          !isFinite(codePoint) ||
          codePoint < 0 ||
          codePoint > 0x10ffff ||
          floor(codePoint) != codePoint
        ) {
          throw RangeError("Invalid code point: " + codePoint);
        }
        if (codePoint <= 0xffff) {
          // BMP code point
          codeUnits.push(codePoint);
        } else {
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xd800;
          lowSurrogate = (codePoint % 0x400) + 0xdc00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    },
  });
}

/**
 * String.codePointAt()
 */
if (!String.prototype.codePointAt) {
  Object.defineProperty(String.prototype, "codePointAt", {
    configurable: true,
    writable: true,
    value: function (position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      var index = position ? Number(position) : 0;
      if (index != index) {
        index = 0;
      }
      if (index < 0 || index >= size) {
        return undefined;
      }
      var first = string.charCodeAt(index);
      var second;
      if (first >= 0xd800 && first <= 0xdbff && size > index + 1) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xdc00 && second <= 0xdfff) {
          return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
        }
      }
      return first;
    },
  });
}

/**
 * String.endsWith()
 */
if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, "endsWith", {
    configurable: true,
    writable: true,
    value: function (searchString, position) {
      var subjectString = this.toString();
      if (
        typeof position !== "number" ||
        !isFinite(position) ||
        Math.floor(position) !== position ||
        position > subjectString.length
      ) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    },
  });
}

/**
 * String.includes()
 */
if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, "includes", {
    configurable: true,
    writable: true,
    value: function (search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    },
  });
}

/**
 * String.padEnd()
 */
if (!String.prototype.padEnd) {
  Object.defineProperty(String.prototype, "padEnd", {
    configurable: true,
    writable: true,
    value: function (targetLength, padString) {
      targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
      padString = String(typeof padString !== "undefined" ? padString : " ");
      if (this.length > targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return String(this) + padString.slice(0, targetLength);
      }
    },
  });
}

/**
 * String.padStart()
 */
if (!String.prototype.padStart) {
  Object.defineProperty(String.prototype, "padStart", {
    configurable: true,
    writable: true,
    value: function (targetLength, padString) {
      targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
      padString = String(typeof padString !== "undefined" ? padString : " ");
      if (this.length > targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this);
      }
    },
  });
}

/**
 * String.repeat()
 */
if (!String.prototype.repeat) {
  Object.defineProperty(String.prototype, "repeat", {
    configurable: true,
    writable: true,
    value: function (count) {
      if (this == null) {
        throw new TypeError("can't convert " + this + " to object");
      }
      var str = "" + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError("repeat count must be non-negative");
      }
      if (count == Infinity) {
        throw new RangeError("repeat count must be less than infinity");
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return "";
      }
      if (str.length * count >= 1 << 28) {
        throw new RangeError(
          "repeat count must not overflow maximum string size"
        );
      }
      var rpt = "";
      for (;;) {
        if ((count & 1) == 1) {
          rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
          break;
        }
        str += str;
      }
      return rpt;
    },
  });
}

/**
 * String.startsWith()
 */
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, "startsWith", {
    configurable: true,
    writable: true,
    value: function (searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
    },
  });
}

/**
 * String.trim()
 */
if (!String.prototype.trim) {
  Object.defineProperty(String.prototype, "trim", {
    configurable: true,
    writable: true,
    value: function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    },
  });
}

/**
 * String.trimLeft()
 */

/**
 * String.trimRight()
 */
