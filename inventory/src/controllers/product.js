import ProductModel from '../models/product.js';

class ProductController {
    create(req, res, next) {
        const { name, desc, price, imageUrl} = req.body;
        // console.log(req.body);
        ProductModel.add({name, desc, price, imageUrl});
        let products = ProductModel.get()
        return res.status(200).json({
            success: true,
            message: "Data added successfully",
            id: products.length
        });
    }

    get(req, res, next) {
        let products = ProductModel.get()  
        // console.log(products);
     
        return res.json({products}); 
    }

    getById(req, res, next){
        const id = Number(req.params.id);
        let products = ProductModel.getById(id);  
        console.log(products);
     
        return res.json({products:[products]}); 
    }

    update(req, res) {
        try {
            const id = Number(req.params.id);
            ProductModel.update(id, req.body); 
            return res.status(200).json({
                success: true,
                message: "Data updated successfully",
                updatedProduct: req.body 
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
            ProductModel.delete(id); 
            return res.status(200).json({
                success: true,
                message: `Product with ID ${id} deleted successfully`
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}


export default new ProductController();