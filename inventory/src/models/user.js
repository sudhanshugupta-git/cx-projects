export default class UserModel{

    constructor(_id, _name, _email, _pass){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _pass;
    }

    static get(){
        return users;
    }

    static add(newUser){
      users.push(new UserModel(
        users.length+1,
        newUser.name,
        newUser.email,
        newUser.password
      ));
    }

    static getById(id) {
      return users.find((p) => p.id == id);  
    }


    static update(id, body) {
      console.log("update method called for ID:", id);
      const index = users.findIndex(p => p.id == id);
  
      if (index === -1) {
          throw new Error(`User with ID ${id} not found`);
      }
  
      users[index] = body;
      console.log(`User with ID ${id} updated successfully`);
  }


    static delete(id) {
      console.log("DELETE method called for ID:", id);
      const index = users.findIndex(p => p.id == id);
  
      if (index === -1) {
          throw new Error(`User with ID ${id} not found`);
      }
  
      // Remove the product from the array
      users.splice(index, 1);
      console.log(`User with ID ${id} deleted successfully`);
  }
}

let users = []