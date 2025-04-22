import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../../models/index.js";
const { User} = db;

class UserController {
    async signUp(req, res) {
        try {
            const { name, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = await User.create({ name, email, password:hashedPassword });

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


    // async signIn(req, res, next) {
    //     try {
    //         const user = await User.findOne({ where: { email: req.body.email } });
    
    //         if (!user) {
    //             return res.status(400).send('User not found!');
    //         }

    //         const isMatch = await bcrypt.compare(req.body.password, user.password);
    
    //         if (!isMatch) {
    //             return res.status(400).send('Incorrect Password!');
    //         }
    
    //         const token = jwt.sign(
    //             {
    //                 userID: user.id,  
    //                 email: user.email,
    //             },
    //             process.env.JWT_SECRET,
    //             {
    //                 expiresIn: '1h',
    //             }
    //         );
    
    //         return res.status(200).send(token);
    
    //     } catch (err) {
    //         console.error(err);
    //         return res.status(500).send("Something went wrong");
    //     }
    // }

    async signIn(req, res, next) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
    
            if (!user) {
                return res.status(400).send('User not found!');
            }
    
            const isMatch = await bcrypt.compare(String(req.body.password), user.password);
    
            if (!isMatch) {
                console.log('Incorrect password');
                return res.status(400).send('Incorrect Password!');
            }
    
            const token = jwt.sign(
                {
                    userID: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            );
    
            console.log('Token created:', token);
            return res.status(200).json({token});
    
        } catch (err) {
            console.error('Error during signIn:', err);
            return res.status(500).send("Something went wrong");
        }
    }
    


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
}


export default new UserController();