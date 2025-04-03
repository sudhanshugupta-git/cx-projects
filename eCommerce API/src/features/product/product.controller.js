import ProductModel from "./product.model.js";


export default class ProductController {

    getAllProducts(req, res) {
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    // addProduct(req, res){
    //     console.log(req.body);
    //     console.log("this is a post request");
    //     res.status(200).send("Post request received");
    // }


    addProduct(req, res) {
        const { name, price, sizes } = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename,
        };
        const createdRecord = ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    getOneProduct(req, res) {
        const id = req.params.id;
        const product = ProductModel.get(id);
        if (!product) {
            res.status(404).send("Product not found!");
        } else {
            return res.status(200).send(product);
        }
    }


    // using try-catch
    rateProduct(req, res) {
        const userID = req.query.userID;
        const productID = req.query.productID;
        const rating = req.query.rating;
        // we u are enclosing using try-catch block here then it'll handle it here itself and will not goto error handler in server.js file
        // try {
            ProductModel.rateProduct(
                userID,
                productID,
                rating
            );
        // } catch (err) { // it send an object which contains, message, name, stack
        //     return res.status(400).send(err.message);
        // }
        return res
            .status(200)
            .send('Rating has been added');
    }



    filterProducts(req, res) {
        console.log(req.query);
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);
    }

}