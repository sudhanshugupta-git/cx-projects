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




// Array of objects
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 700 },
    { id: 2, name: 'Book', category: 'Stationery', price: 15 },
    { id: 3, name: 'Smartphone', category: 'Electronics', price: 500 },
    { id: 4, name: 'Pen', category: 'Stationery', price: 2 },
    { id: 5, name: 'Tablet', category: 'Electronics', price: 300 }
  ];
  
  // Using "find" to get the first product in the 'Electronics' category
  const firstElectronics = products.find(product => product.category === 'Electronics');
  console.log(firstElectronics);
  // Output: { id: 1, name: 'Laptop', category: 'Electronics', price: 700 }
  

  