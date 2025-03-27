export default class CartModel {
    constructor(_id, _name, _desc, _price, _imageUrl) {
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
        this.quantity = 1;
    }
    static add(newProduct) {
        cart.push(new CartModel(
            newProduct.id,
            newProduct.name,
            newProduct.desc,
            newProduct.price,
            newProduct.imageUrl
        ));
    }

    static get() {
        return cart;
    }

    static addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            updateCart(product.id, existingItem.quantity + 1);
        } else {
            //   cart.push([...cart, { ...product, quantity: 1 }]);
            this.add(product);
        }
        return cart;
    };

    static handleCartToggle = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            // Remove the product from the cart
            cart = (cart.filter((item) => item.id !== product.id));
        } else {
            // Add the product to the cart
            addToCart(product);
        }
        return cart;
    };

    static updateCart = (id, quantity) => {
        // cart.push(cart.map(item => item.id === id ? { ...item, quantity } : item));
        console.log(quantity)
        cart = cart.map(item => item.id === id ? { ...item, quantity: quantity.quantity } : item);
        return cart;
    };

    static removeFromCart = (id) => {
        cart = (cart.filter(item => item.id !== id));
        return cart;
    };
}

let cart = [];