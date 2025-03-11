let numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num)); // Output: 1 2 3 4 5



//  For a given array of numbers, print the square of each value using the forEach loop.
let nums = [44,52,63];
let calcSquare = (num) =>{
     console.log(num**2);
}
nums.forEach(calcSquare);



//using callback
function forEach(arr, callback) {
     for (let index = 0; index < arr.length; index++) {
         const value = arr[index];
         callback(value, index);
     }
}

const arr = [1, 2, 3, 4, 5];

forEach(arr, (val, i) => console.log("Value:", val, "At Index:", i));