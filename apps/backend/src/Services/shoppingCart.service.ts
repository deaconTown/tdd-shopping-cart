import { CartItem } from "../Entities/CartItem";
import { Catelog } from "src/Entities/Catelog";
import { IShoppingCartService } from "src/Interfaces/IShoppingCart.interface";
import { IProductService } from "src/Interfaces/IProductService.interface";

export class ShoppingCartService implements IShoppingCartService {
  private cartItems: CartItem[] = [];

  /**
   *
   */
  constructor(private productService: IProductService) {
    id: 1
  }

  checkExists(cart1: CartItem): boolean {
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

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartItemsById(id: number): CartItem {
    var foundCartItem = this.cartItems.find(x => x.id === id)
    return foundCartItem;
  }

  addItem(cart: CartItem): CartItem {
    let cartItemToAdd = cart;
    //check if product is available to add
    const productToAdd = this.productService.getProductById(cart.productId);

    if (productToAdd && productToAdd.isActive) {
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
    }
    else {
      cartItemToAdd = undefined;
    }

    return cartItemToAdd;
  }

  updateCartItem = (cart: CartItem) => {

    var foundIndex = this.cartItems.findIndex(x => x.id == cart.id);
    this.cartItems[foundIndex] = cart;
  }

  increaseCartItemQty(id: number, qty: number): CartItem {
    var cartItemFound = this.getCartItemsById(id);

    if (cartItemFound) {
      var updatedCartItem = {
        id: cartItemFound.id,
        productId: cartItemFound.productId,
        qty: cartItemFound.qty + qty,
        shoppingCartId: cartItemFound.shoppingCartId
      }
      return updatedCartItem;
    }
    return { id: 0, productId: 0, qty: 0, shoppingCartId: 0 };
  }

  decreaseCartItemQty(id: number): CartItem {
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

  getCartItemsCostById(id: number) {

    let cartItem = this.getCartItemsById(id);
    let productItem = this.productService.getProductById(cartItem.productId);

    let itemCost = cartItem.qty * productItem.unitPrice;
    return itemCost;
  }

  getCartTotalCost(shoppingCartId: number) {
    let totalCost = 0.00;
    let cartItemList = this.cartItems.filter(x => x.shoppingCartId === shoppingCartId);

    cartItemList.forEach(item => {
      let productItem = this.productService.getProductById(item.productId);

      totalCost += (item.qty * productItem.unitPrice)
    });

    return totalCost;
  }

  addCatelogToCart(calelog: Catelog): boolean {
    let success = false;
    let cartItemId = 1;
    
    calelog.items.forEach(item => {
      //create a cart item with the product
      //TODO: GENEREATE UNIQUE ID 
      //TODO: fIGURE OUT THE SHOPPING CART ID HARDCODED ISSUE
      let cartItem : CartItem = { id: cartItemId, productId: item.productId, qty: item.qty, shoppingCartId: 1 }

      //add cart item to cart
      this.addItem(cartItem);

      cartItemId += 1;

      success = true;
      
    });
    return success
  }



}