/**
 * Object.values()
 */
if (!Object.values) {
  Object.values = function (obj) {
    var keys = Object.keys(obj);
    return keys.map(function (key) {
      return obj[key];
    });
  };
}

/**
 * Object.values()
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 */
if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

/**
 * Object.fromEntries()
 */
if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    var o = {};
    entries.forEach(function (e) {
      var k = e[0];
      var v = e[1];
      o[k] = v;
    });
    return o;
  };
}
