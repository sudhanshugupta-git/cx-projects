// Array of objects
const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'editor' },
    { id: 3, name: 'Charlie', role: 'viewer' }
  ];
  
  // Using "some" to check if any user has the role "admin"
  const hasAdmin = users.some(user => user.role === 'admin');
  console.log(hasAdmin); // Output: true (because Alice is an admin)
  
 
  