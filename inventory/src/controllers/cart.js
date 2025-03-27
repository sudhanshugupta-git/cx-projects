import CartModel from "../models/cart.js";

class CartController {

    create(req, res, next) {
        // console.log(req.body);
        const { id, name, desc, price, imageUrl} = req.body;
        const data = CartModel.addToCart({id, name, desc, price, imageUrl});
        return res.status(200).json({data});
    }

    get(req, res, next) {
        let data = CartModel.get();
        // console.log(data);
        return res.status(200).json({data});
    }

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
}


export default new CartController();