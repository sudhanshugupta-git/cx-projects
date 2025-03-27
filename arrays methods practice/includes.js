//  it compares address(reference) so, apply includes method in identical array
 
 // Array of objects
const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'editor' },
    { id: 3, name: 'Charlie', role: 'viewer' }
  ];
  

 // Using "includes" to check if a specific name exists
  // First, extract the names into an array
  const userNames = users.map(user => user.name);
  const includesAlice = userNames.includes('Alice');
  console.log(includesAlice); // Output: true (because "Alice" is in the array of names)