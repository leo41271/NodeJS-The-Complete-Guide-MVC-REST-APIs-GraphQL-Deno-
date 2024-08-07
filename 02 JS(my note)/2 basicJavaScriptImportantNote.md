### Optional JavaScript  - A quick refresher (JS 一些重要語法)
19. Understanding Spread & Rest Operators （展開 、剩餘 運算符）
```
Spread 展開
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

function sum(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }

REST 剩餘運算符
function sum(...args) {
    return args.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a); // 1
console.log(b); // 2
console.log(rest); // { c: 3, d: 4 }
```
20. Destructuring 解構
```
Destructuring 解構
const person = {
    name: 'Alice',
    age: 25,
    address: {
        city: 'Wonderland',
        zip: '12345'
    }
};
// 基本解構賦值
const { name, age } = person;
console.log(name); // Alice console.log(age); // 25
// 使用別名
const { name: fullName, age: years } = person;
console.log(fullName); // Alice console.log(years); // 25
// 嵌套解構
const {
    address: { city, zip }
} = person;
console.log(city); // Wonderland console.log(zip); // 12345
// 使用剩餘運算符（Rest operator）
const { name: firstName, ...restProps } = person;
console.log(firstName); // Alice
console.log(restProps); // { age: 25, address: { city: 'Wonderland', zip: '12345' } }

// 陣列參數解構
function printCoordinates([x, y]) {
    console.log(`X: ${x}, Y: ${y}`);
}
printCoordinates([10, 20]); // X: 10, Y: 20
// 物件參數解構
function printPerson({ name, age }) {
    console.log(`Name: ${name}, Age: ${age}`);
}
printPerson({ name: 'Alice', age: 25 }); // Name: Alice, Age: 25
```
21. Async Code & Promises 

+ [MDN promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
+ 或參看我自己的Promise筆記

22. Template Literals : `${ variable }`
```
模板字面量（template literal）是一種 JavaScript 字串的表示方法，使用反引號（`）包裹字串，並在其中使用 ${} 來插入變數或表達式。
const product = '手機';
const price = 3000;
const message = `我想買一個 ${product}，價格是 ${price} 元。`;
```
