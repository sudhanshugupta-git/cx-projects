import CartModel from "../models/cart.js";
import Cart from "../db_models/cart.js";

class CartController {

    create(req, res, next) {
        // console.log(req.body);
        const { id, name, desc, price, imageUrl, userId} = req.body;
        const data = CartModel.addToCart({id, name, desc, price, imageUrl, userId});
        return res.status(200).json({data});
    }

    // async create(req, res, next){
    //     try {
    //         // Extracting required data from the request body
    //         console.log(req.body);
    //         const { productId, name, desc, price, imageUrl } = req.body;
    
    //         // Creating or adding the item to the cart
    //         const newCartItem = await Cart.create({
    //             productId, 
    //             name, 
    //             desc, 
    //             price, 
    //             imageUrl
    //         });
    
    //         // Sending the response
    //         // return res.status(200).json({ data: newCartItem });
    //         this.get();
    //     } catch (error) {
    //         // Error handling
    //         console.error(error);
    //         return res.status(500).json({ error: "Failed to add the item to the cart." });
    //     }
    // }

    get(req, res, next) {
        let data = CartModel.get();
        // console.log(data);
        return res.status(200).json({data});
    }

    // async get(req, res, next){
    //     try {
    //         // Fetching all cart items from the database
    //         const data = await Cart.findAll();
    
    //         // Sending the response
    //         return res.status(200).json({ data });
    //     } catch (error) {
    //         // Handling errors
    //         console.error(error);
    //         return res.status(500).json({ error: "Failed to retrieve cart items." });
    //     }
    // }

    update(req, res) {
        try {
            const id = Number(req.params.id);
            console.log(req.body);
            const data = CartModel.updateCart(id, req.body); 
            return res.status(200).json({data});
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message 
            });
        }
    }


    // async update(req, res){
    //     try {
    //         // Extracting the id from request parameters
    //         const id = Number(req.params.id);
    
    //         // Extracting the data to be updated from the request body
    //         const updateData = req.body;
    
    //         // Updating the cart item in the database
    //         const [updatedRows] = await Cart.update(updateData, {
    //             where: { id }
    //         });
    
    //         // Handling the response based on the number of updated rows
    //         if (updatedRows === 0) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "No cart item found with the given id."
    //             });
    //         }
    
    //         // Sending a success response
    //         // return res.status(200).json({
    //         //     success: true,
    //         //     message: "Cart item updated successfully."
    //         // });
    //         get();
    
    //     } catch (error) {
    //         // Handling errors
    //         console.error(error);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Failed to update the cart item.",
    //             error: error.message
    //         });
    //     }
    // }
    
    delete(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID provided"
            });
        }
    
        try {
            const data = CartModel.removeFromCart(id); 
            return res.status(200).json({data});
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // async delete(req, res){
    //     try {
    //         // Extracting the ID from request parameters
    //         const productId = Number(req.params.id);
    
    //         // Validating the ID
    //         if (!productId) {
    //             return res.status(400).json({
    //                 success: false,
    //                 message: "Invalid ID provided"
    //             });
    //         }
    
    //         // Deleting the cart item from the database
    //         const deletedRows = await Cart.destroy({
    //             where: { productId }
    //         });
    
    //         // Checking if any rows were deleted
    //         if (deletedRows === 0) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "No cart item found with the given ID."
    //             });
    //         }
    
    //         // Sending a success response
    //         // return res.status(200).json({
    //         //     success: true,
    //         //     message: "Cart item deleted successfully."
    //         // });
    //         this.get();
    
    //     } catch (error) {
    //         // Handling errors
    //         console.error(error);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Failed to delete the cart item.",
    //             error: error.message
    //         });
    //     }
    // }
}


export default new CartController();