let cart = null;

module.exports = class Cart {

    static save(product) {
        if(cart){
          const existingProductIndex =  cart.products.findIndex(p=>p.id==product.id)
          if(existingProductIndex>=0){
               const existingProduct = cart.products[existingProductIndex]
               existingProduct.qty += 1
               cart.totalPrice += product.price
          }else{
            product.qty = 1
            cart.products.push(product)
            cart.totalPrice += product.price
          }
        }else{
            
            cart ={products:[],totalPrice:0}

            product.qty = 1
            cart.products.push(product)
            cart.totalPrice += product.price
        }
    }
    static getCart() {
        return cart;
    }

}