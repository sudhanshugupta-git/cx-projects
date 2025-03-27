//  Creates a new array of elements that give true for a condition
// Returns: A new array with fewer or the same number of elements.

let numbers = [1, 2, 3, 4, 5];
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]



const marks = [50,80,75,5,90,19,98,18,99,92,93];
let toppers = marks.filter(num => num>90);
console.log(toppers); 


//using callback
function filter(arr, callback) {
    let result = [];
    for (let index = 0; index < arr.length; index++) {
        if (callback(arr[index])) {         //callback(arr[index], index) can also pass index
            result.push(arr[index]);
        }
    }
    return result;
}

// Example usage
const arr = [1, 2, 3, 4, 5];

console.log("filter:", filter(arr, value => value % 2 === 0));



// Array of objects
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 700 },
    { id: 2, name: 'Book', category: 'Stationery', price: 15 },
    { id: 3, name: 'Smartphone', category: 'Electronics', price: 500 },
    { id: 4, name: 'Pen', category: 'Stationery', price: 2 },
    { id: 5, name: 'Tablet', category: 'Electronics', price: 300 }
  ];


  // Using "filter" to get all products in the 'Electronics' category
  const allElectronics = products.filter(product => product.category === 'Electronics');
  console.log(allElectronics);
  // Output:
  // [
  //   { id: 1, name: 'Laptop', category: 'Electronics', price: 700 },
  //   { id: 3, name: 'Smartphone', category: 'Electronics', price: 500 },
  //   { id: 5, name: 'Tablet', category: 'Electronics', price: 300 }
  // ]