function findAll(arr, callback) {
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        if (callback(arr[index], index)) {
            result.push(arr[index]);
        }
    }
    return result;
}

// Example usage
const arr = [1, 2, 3, 4, 5];

console.log("findAll:", findAll(arr, value => value > 2));