export interface ICartItem {
  id: number;
  name: string;
  qty?: number
}


export class ShoppingCart {

  cartItems: ICartItem[] = [{ id: 1, name: 'item 1', qty: 2 }];

  checkExists(cart1: ICartItem): boolean {
    var cartItemExits: boolean = false;
    var foundCartItem = this.cartItems.find(x => x.id === cart1.id);

    if (foundCartItem) {
      cartItemExits = true;
    }

    return cartItemExits;

  }

  removeItem(arg0: number) {
    // throw new Error('Method not implemented.');
    this.cartItems = this.cartItems.filter(x => x.id !== arg0);
    return this.cartItems;
  }

  getCartItems(): any {
    return this.cartItems;
  }

  getCartItemsById(id: number): ICartItem {
    var foundCartItem = this.cartItems.find(x => x.id === id)
    return foundCartItem;
  }

  addItem(cart: { id: number, name: string, qty?: number }) {

    //check if item exist
    let foundCartItem = this.checkExists(cart);
    if (foundCartItem) {

      if (cart.qty === undefined) {
        //update qty for existing cart item by 1
        cart.qty = this.increaseCartItemQty(cart.id, 1).qty;
        // console.log('it is undefined cart qty', cart)
      };
      //update cart item
      this.updateCartItem(cart);
    }
    else {
      //set new cart item to 1
      if (cart.qty === undefined) {
        cart.qty = 1;
      };
      this.cartItems.push(cart);
    }
    return cart;
  }

  updateCartItem = (cart: ICartItem) => {

    var foundIndex = this.cartItems.findIndex(x => x.id == cart.id);
    this.cartItems[foundIndex] = cart;
  }

  increaseCartItemQty(id: number, qty: number): ICartItem {
    var cartItemFound = this.getCartItemsById(id);

    if (cartItemFound) {
      var updatedCartItem = {
        id: cartItemFound.id,
        name: cartItemFound.name,
        qty: cartItemFound.qty + qty
      }
      return updatedCartItem;
    }
    return { id: 0, name: 'item 0', qty: 0 };
  }

  decreaseCartItemQty(id: number): ICartItem {
    let cartItem = this.getCartItemsById(id);
    cartItem.qty -= 1;
    if (cartItem.qty === 0) {
      this.removeItem(cartItem.id)
    }
    {
      this.updateCartItem(cartItem);
    }
    return cartItem;
  }

  clearCart() {
    this.cartItems = [];

    return this.cartItems;
  }


}