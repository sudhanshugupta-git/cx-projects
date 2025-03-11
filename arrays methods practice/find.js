// The find method returns the **value of the first element in the array** that satisfies the provided testing function.

let numbers = [1, 2, 3, 4, 3,5,6];
let found = numbers.find(num => num >4);
console.log(found); 


function find(arr, callback) {
    for (let index = 0; index < arr.length; index++) {
        if (callback(arr[index], index)) {
            return arr[index];
        }
    }
    return undefined;
}

const arr = [1, 2, 3, 4, 5];

console.log("find:", find(arr, value => value > 2));