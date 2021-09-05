// Javascript ES6 Exercise

// 1. Define a variable
const MAX_SIZE = 25 * 1024 * 1024;
let title = "Hello World";
title = "Hello ES6";

//   - Question: Let and Const – What's the Difference?

// const không cho sử dụng lại, với mảng và đối tượng thì có thể thêm phần tử vì
// không gán biến mà kiểu dữ liệu đã được lưu trong biến
// let có thể sử dụng lại, scope sensitive -> khi khai báo biến ở bên trong scope
//  (function, for, if, while..) trừ global scope thì ra ngoài sẽ không thể access được

// 2. String Interpolation
const user = { name: "David" };
const card = { amount: 7, product: "Bar", unitprice: 42 };
const message = `Hello ${user.name},
want to buy ${card.amount} ${card.product} for 
a total of ${card.amount * card.unitprice} bucks?`;

// 3. Rest Parameter
const foo = (x, y, ...a) => (x + y) * a.length;
foo(1, 2, "hello", true, 7) === 9;

// 4. Default Parameter Values
const sum = (x, y = 7, z = 42) => x + y + z;

// 5. Arrow Functions
const evens = [1, 2, 3, 4, 5, 6];
const odds = evens.map((v) => v + 1);
const pairs = evens.map((v) => ({ even: v, odd: v + 1 }));
const nums = evens.map((v, i) => v + i);
const fives = [];
nums.forEach((v) => {
  v % 5 === 0 && fives.push(v);
});

// 6. Classes
class Shape {
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }
}

// 7. Modules
//  lib/utils.js
const Utils = {
  sum: (x, y) => x + y,
  pi: 3.141593,
};
export default Utils;

//  someApp.js
import Utils from "lib/utils";
const math = Utils;
console.log("2π = " + math.sum(math.pi, math.pi));

//  otherApp.js
import Utils from "lib/utils";
const sum = Utils.sum;
const pi = Utils.pi;
console.log("2π = " + sum(pi, pi));

// 8. Promise
const showMessAfterTimeout = (msg, who, timeout) =>
  new Promise((resolve) => setTimeout(resolve(`${msg} Hi ${who}!`), timeout));

showMessAfterTimeout("", "Foo", 100).then((message) => {
  showMessAfterTimeout(message, "Bar", 200).then((message) =>
    console.log("Finish after 300ms:" + message)
  );
});

// 9. Loops
//   - Give an example for each method:
//     + for…of
const array = [5, 12, 8, 130, 44];
for (const element of array) {
  console.log(element);
}

//     + findIndex()
const isLargeNumber = (element) => element > 13;
console.log(array.findIndex(isLargeNumber));
