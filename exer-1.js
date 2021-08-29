console.log("--- Equal area ---");

var a = 2;
var b = "2";
console.log(a == b); // true
console.log(a === b); // false

console.log("--- Array methods area ---");
var array = [1, 4, 9, 16];

var map = array.map(function (x) {
  return x * 2;
});
var filter = array.filter(function (x) {
  return x % 2;
});
var find = array.find(function (x) {
  return x > 4;
});
var some = array.some(function (x) {
  return x % 4;
});
var reduce = array.reduce(function (acc, cur) {
  return acc + cur;
});
console.log(map);
console.log(filter);
console.log(find);
console.log(some);
console.log(reduce);

var push = array.push(7);
console.log(array);
var unshift = array.unshift(3);
console.log(array);
var shift = array.shift();
console.log(array);

console.log("--- Play Ground ---");
console.log("-- Question 1 --");
function sumTwoInteger(a, b) {
  return a === b ? 6 * a : a + b;
}
console.log(sumTwoInteger(5, 10));
console.log(sumTwoInteger(5, 5));

console.log("-- Question 2 --");
function getAbsoluteNumber(x) {
  return x <= 19 ? 19 - x : 3 * (x - 19);
}
console.log(getAbsoluteNumber(12));
console.log(getAbsoluteNumber(19));
console.log(getAbsoluteNumber(22));

console.log("-- Question 3 --");
function getDividedNumber(string, number) {
  var splittedArray = string.toString().split("");
  var asteriskIndex = splittedArray.indexOf("*");
  var result = [];
  for (let index = 0; index < 10; index++) {
    splittedArray[asteriskIndex] = index;
    var numberParsed = parseInt(splittedArray.join(""));
    if (numberParsed % number === 0) {
      result.push(numberParsed.toString());
    }
  }
  return result;
}
console.log(getDividedNumber("1*9", 3));
console.log(getDividedNumber("1234567890*", 3));

console.log("-- Question 4 --");

console.log(getDividedNumber("1*9", 6));
console.log(getDividedNumber("1234567890*", 6));
