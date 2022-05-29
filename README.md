# ee-polyfill

[![Earth Engine Javascript](https://img.shields.io/badge/Earth%20Engine%20API-Javascript-red)](https://developers.google.com/earth-engine/tutorials/tutorial_api_01)
[![Open in Code Editor](https://img.shields.io/badge/Open%20in-Code%20Editor-9cf)](https://code.earthengine.google.com/60126127cbeb8487e7dd54b3a67f0988)

# Description

`ee-polyfill` loads newer JavaScript methods (ES6+) into the [Earth Engine Code Editor](https://developers.google.com/earth-engine/guides/playground) with a single import. Implementations are originally from [behnammodi/polyfill](https://github.com/behnammodi/polyfill), with modifications to ensure Earth Engine compatibility.

# Usage

Just import the module with `require` to load all of the polyfilled methods.

```javascript
require("users/aazuspan/polyfill:all");
```

New methods are automatically added to JavaScript objects. A few examples are demonstrated below:

```javascript
// Array methods
var a = [0, [1, 1], [[8, 9, 9, 9]]];
a.includes(0); // true
a.flat(2); // [0, 1, 1, 8, 9, 9, 9]

// Math methods
var x = 4.05;
Math.sign(x); // 1
Math.trunc(x); // 4

// Number methods
var n = 32768;
Number.isInteger(n); // true

// Object methods
var o = {"a": 42, "b": 12};
Object.values(o); // [42, 12]
Object.entries(o); // [["a", 42], ["b", 12]]

// String methods
var s = "abc";
s.startsWith("b"); // false
s.repeat(3); // abcabcabc
```

# Methods

`ee-polyfill` includes all of the methods listed at [behnammodi/polyfill](https://github.com/behnammodi/polyfill#polyfill-includes), plus those listed below:

## Object

```javascript
Object.values();
Object.entries();
Object.fromEntries();
```