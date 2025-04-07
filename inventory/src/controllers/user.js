import UserModel from '../models/user.js';
import User from '../db_models/users.js';
import Rating from '../db_models/ratings.js';
import Product from '../db_models/products.js';

class UserController {
    // create(req, res, next) {
    //     console.log(req.body);
    //     const { name, email, password} = req.body;
    //     UserModel.add({name, email, password});
    //     let users = UserModel.get()
    //     return res.status(200).json({
    //         success: true,
    //         message: "User added successfully",
    //         id: users.length
    //     });
    // }

    async create(req, res) {
        try {
          const { name, email, password } = req.body;
    
          const newUser = await User.create({ name, email, password });
    
          return res.status(201).json({
            success: true,
            message: "User added successfully",
            id: newUser.id
          });
    
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
          });
        }
    }

    // get(req, res, next) {
    //     let users = UserModel.get()  
    //     console.log(users);
     
    //     return res.json({users}); 
    // }
    async get(req, res) {
        try {
          const users = await User.findAll();
    
          return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
          });
    
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: error.message
          });
        }
    }



    // update(req, res) {
    //     const id = Number(req.params.id);
    //     if (!id) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Invalid ID provided"
    //         });
    //     }
    
    //     try {
    //         UserModel.update(id, req.body); 
    //         return res.status(200).json({
    //             success: true,
    //             message: "Data updated successfully",
    //             updatedUser: req.body 
    //         });
    //     } catch (error) {
    //         return res.status(400).json({
    //             success: false,
    //             message: error.message 
    //         });
    //     }
        
    // }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
    
        try {
          const [updated] = await User.update(
            { name, email, password },
            { where: { id } }
          );
    
          if (updated === 0) {
            return res.status(404).json({
              success: false,
              message: `User with ID ${id} not found or no changes made`
            });
          }
    
          const updatedUser = await User.findByPk(id);
    
          return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
          });
    
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message
          });
        }
    }
    
    // delete(req, res) {
    //     const id = Number(req.params.id);
    //     if (!id) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Invalid ID provided"
    //         });
    //     }
    
    //     try {
    //         UserModel.delete(id); 
    //         return res.status(200).json({
    //             success: true,
    //             message: `User with ID ${id} deleted successfully`
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             success: false,
    //             message: error.message
    //         });
    //     }
    // }

    async delete(req, res) {
        const { id } = req.params;
    
        try {
          const deleted = await User.destroy({ where: { id } });
    
          if (deleted === 0) {
            return res.status(404).json({
              success: false,
              message: `User with ID ${id} not found`
            });
          }
    
          return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
          });
    
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
          });
        }
    }


    
    // getById(req, res, next){
    //     const id = Number(req.params.id);
    //     let user = UserModel.getById(id);  
    //     console.log(user);
     
    //     return res.json({user}); 
    // }

    async getById(req, res) {
        const { id } = req.params;
    
        try {
          const user = await User.findByPk(id);
    
          if (!user) {
            return res.status(404).json({
              success: false,
              message: `User with ID ${id} not found`
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
          });
    
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
            error: error.message
          });
        }
    }


    async getUserRatings(req, res) {
        const { userId } = req.params;
      
        try {
          const ratings = await Rating.findAll({
            where: { userId },
            // include: [{ model: Product }]
          });
      
          return res.status(200).json({
            success: true,
            data: ratings
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Failed to get ratings for user',
            error: error.message
          });
        }
    }
}


export default new UserController();