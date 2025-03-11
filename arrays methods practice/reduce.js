// Performs some operations & reduces the array to a single value. It returnsthat single value.

// ex: sum of all elements
let numbers = [1, 2, 3, 4, 5];
let initialValue = 0;
let sum = numbers.reduce((accumulator, curr) => accumulator + curr, initialValue);
console.log(sum); // Output: 15


// Q: Find largest number using reduce method
let arr = [18, 20, 10, 4, 5];
let largestNum = arr.reduce((accumulator, curr) => accumulator < curr ? curr : accumulator, arr[0]);
console.log(largestNum); // Output: 20


// using callbacks
function reduce(arr, callback, initialValue) {
    let accumulator = initialValue;
    for (let index = 0; index < arr.length; index++) {
        accumulator = callback(accumulator, arr[index]);
    }
    return accumulator;
}

const exArr = [1, 2, 3, 4, 5];

console.log("reduce:", reduce(exArr, (sum, value) => sum + value, 0));