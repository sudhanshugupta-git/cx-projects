
// productID, userID, quantity
export default class CartModel{
    constructor(userID, productID, quantity){
        this.userID = userID;
        this.productID = productID;
        this.quantity = quantity;
    }

    static add(productID, userID, quantity) {
        const cartItem = new CartModel(userID, productID, quantity);
        cartItems.push(cartItem);
        return cartItem;
    }

    static get(userID){
        // console.log("get model called")
        // console.log(userID);
        return cartItems.filter( (i)=> i.userID == userID );
    }

    static delete(productID, userID){
        const productIndex = cartItems.findIndex(
            (i)=> i.productID == productID && i.userID == userID);
            if(productIndex == -1){
                return "Item not found";
            } else {
                cartItems.splice(productIndex, 1);
            }
    }
}

var cartItems = [new CartModel(1,2,3), new CartModel(2,1,2)];