// Creates a new array with the results of some operation. 
// Purpose: Transforms each element in an array and returns a new array of the same length.
// Returns: A new array with modified elements.

let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(num => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]


// given an object. create an array of the prices of the products
const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Phone', price: 500 },
    { name: 'Tablet', price: 700 }
];

const prices = products.map((product) => product.price);

console.log(prices); // Output: [1000, 500, 700]


// using callbacks
function map(arr, callback) {
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        result.push(callback(arr[index]));  //callback(arr[index], index) can also pass index
    }
    return result;
}


const arr = [1, 2, 3, 4, 5];

console.log("map:", map(arr, value => value * 2));