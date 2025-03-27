import UserModel from '../models/user.js';

class UserController {
    create(req, res, next) {
        console.log(req.body);
        const { name, email, password} = req.body;
        UserModel.add({name, email, password});
        let users = UserModel.get()
        return res.status(200).json({
            success: true,
            message: "User added successfully",
            id: users.length
        });
    }

    get(req, res, next) {
        let users = UserModel.get()  
        console.log(users);
     
        return res.json({users}); 
    }

    getById(req, res, next){
        const id = Number(req.params.id);
        let user = UserModel.getById(id);  
        console.log(user);
     
        return res.json({user}); 
    }

    update(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID provided"
            });
        }
    
        try {
            UserModel.update(id, req.body); 
            return res.status(200).json({
                success: true,
                message: "Data updated successfully",
                updatedUser: req.body 
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message 
            });
        }
        
    }
    
    delete(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID provided"
            });
        }
    
        try {
            UserModel.delete(id); 
            return res.status(200).json({
                success: true,
                message: `User with ID ${id} deleted successfully`
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}


export default new UserController();