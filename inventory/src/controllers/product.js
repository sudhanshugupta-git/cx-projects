import ProductModel from '../models/product.js';
import { Op } from 'sequelize';
import Product from '../db_models/products.js';
import Rating from '../db_models/ratings.js';

class ProductController {
    // create(req, res, next) {
    //     const { name, desc, price, imageUrl} = req.body;
    //     // console.log(req.body);
    //     ProductModel.add({name, desc, price, imageUrl});
    //     let products = ProductModel.get()
    //     return res.status(200).json({
    //         success: true,
    //         message: "Data added successfully",
    //         id: products.length
    //     });
    // }

    async create(req, res, next) {
        try {
            const { name, desc, price, imageUrl } = req.body;
    
            const newProduct = await Product.create({
                name,
                desc,
                price,
                imageUrl
                // avgRating is set to 0 by default
            });
    
            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                id: newProduct.id   // sequelize returns the inserted record
            });
        } catch (error) {
            console.error("Error creating product:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to create product",
                error: error.message
            });
        }
    }
    
    

    // get(req, res, next) {
    //     let products = ProductModel.get()  
    //     // console.log(products);
     
    //     return res.json({products}); 
    // }

    async get(req, res) {
        try {
            const products = await Product.findAll();
    
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully",
                data: products
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch products",
                error: error.message
            });
        }
    };

    // getById(req, res, next){
    //     const id = Number(req.params.id);
    //     let products = ProductModel.getById(id);  
    //     console.log(products);
     
    //     return res.json({products:[products]}); 
    // }

    async getById(req, res){
        try {
            const { id } = req.params;
    
            const product = await Product.findByPk(id);
    
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${id} not found`
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "Product fetched successfully",
                data: product
            });
        } catch (error) {
            console.error("Error fetching product:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch product",
                error: error.message
            });
        }
    };

    // update(req, res) {
    //     try {
    //         const id = Number(req.params.id);
    //         ProductModel.update(id, req.body); 
    //         return res.status(200).json({
    //             success: true,
    //             message: "Data updated successfully",
    //             updatedProduct: req.body 
    //         });
    //     } catch (error) {
    //         return res.status(400).json({
    //             success: false,
    //             message: error.message 
    //         });
    //     }
    // }

    async update(req, res){
        try {
            const { id } = req.params;
            const { name, desc, price, imageUrl } = req.body;
    
            const product = await Product.findByPk(id);
    
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${id} not found`
                });
            }
    
            // Update only if values are provided
            if (name !== undefined) product.name = name;
            if (desc !== undefined) product.desc = desc;
            if (price !== undefined) product.price = price;
            if (imageUrl !== undefined) product.imageUrl = imageUrl;
    
            await product.save();
    
            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product
            });
        } catch (error) {
            console.error("Error updating product:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to update product",
                error: error.message
            });
        }
    };
    
    // delete(req, res) {
    //     const id = Number(req.params.id);
    //     if (!id) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Invalid ID provided"
    //         });
    //     }
    
    //     try {
    //         ProductModel.delete(id); 
    //         return res.status(200).json({
    //             success: true,
    //             message: `Product with ID ${id} deleted successfully`
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             success: false,
    //             message: error.message
    //         });
    //     }
    // }

    async delete(req, res){
        try {
            const { id } = req.params;
    
            const product = await Product.findByPk(id);
    
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${id} not found`
                });
            }
    
            await product.destroy();
    
            return res.status(200).json({
                success: true,
                message: `Product with ID ${id} deleted successfully`
            });
        } catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to delete product",
                error: error.message
            });
        }
    };



    async filter(req, res) {
        try {
            const { minPrice, maxPrice, sort, minRating } = req.query;
    
            let whereClause = {};
    
            // Price filter
            if (minPrice !== undefined && maxPrice !== undefined) {
                whereClause.price = {
                    [Op.gte]: parseFloat(minPrice),
                    [Op.lte]: parseFloat(maxPrice)
                };
            } else if (minPrice !== undefined) {
                whereClause.price = { [Op.gte]: parseFloat(minPrice) };
            } else if (maxPrice !== undefined) {
                whereClause.price = { [Op.lte]: parseFloat(maxPrice) };
            }
    
            // Rating filter
            if (minRating !== undefined) {
                whereClause.avgRating = {
                    [Op.gte]: parseFloat(minRating)
                };
            }
    
            // Sorting
            let orderClause = [];

            // if (sort === 'rating_desc') {
            //     orderClause.push(['avgRating', 'DESC']);
            // } else if (sort === 'rating_asc') {
            //     orderClause.push(['avgRating', 'ASC']);
            // } 

            // for multiple sorting
            if (sort) {
                const sortOptions = sort.split(','); // e.g., ['rating_desc', 'price_asc']
            
                sortOptions.forEach(option => {
                    if (option === 'rating_desc') {
                        orderClause.push(['avgRating', 'DESC']);
                    } else if (option === 'rating_asc') {
                        orderClause.push(['avgRating', 'ASC']);
                    } else if (option === 'price_desc') {
                        orderClause.push(['price', 'DESC']);
                    } else if (option === 'price_asc') {
                        orderClause.push(['price', 'ASC']);
                    }
                });
            }
    
            const products = await Product.findAll({
                where: whereClause,
                order: orderClause
            });
    
            return res.status(200).json({
                success: true,
                message: "Filtered products fetched successfully",
                data: products
            });
        } catch (error) {
            console.error("Error filtering products:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to filter products",
                error: error.message
            });
        }
    };


    async rateProduct(req, res) {
        const { productId } = req.params;
        const { userId, rating, comment } = req.body;
    
        try {
            // Add the new rating
            await Rating.create({ productId, userId, rating, comment });
    
            // Fetch all ratings for this product
            const ratings = await Rating.findAll({ where: { productId } });
    
            // Calculate new average rating
            const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    
            // Update product: avgRating and ratingCount
            await Product.update(
                { avgRating, ratingCount: ratings.length },
                { where: { id: productId } }
            );
    
            return res.status(201).json({
                success: true,
                message: 'Rating added and product updated successfully!'
            });
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error adding rating',
                error: error.message
            });
        }
    }
    
}


export default new ProductController();