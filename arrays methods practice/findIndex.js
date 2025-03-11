// The findIndex method **returns the index of the first element in the array that satisfies the provided testing function**. 
// If no elements satisfy the testing function, -1 is returned.

let numbers = [1, 2, 8,3,6, 4, 5];
let index = numbers.findIndex(num => num > 4);
console.log(index); // Output: 3


function findIndex(arr, callback) {
    for (let index = 0; index < arr.length; index++) {
        if (callback(arr[index], index)) {
            return index;
        }
    }
    return -1;
}

// Example usage
const arr = [1, 2, 3, 4, 5];

console.log("findIndex:", findIndex(arr, value => value > 2));