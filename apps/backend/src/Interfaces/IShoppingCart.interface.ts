import { CartItem } from "src/Entities/CartItem";
import { Catelog } from "src/Entities/Catelog";
import { ShoppingCart } from "src/Entities/ShoppingCart";

export interface IShoppingCartService {
    createShoppingCart(customerId: number): ShoppingCart;
    checkExists(cart1: CartItem): boolean;
    removeItem(id: number);
    getCartItems(): CartItem[];
    getCartItemsById(id: number): CartItem;
    addItem(cart: CartItem): CartItem;
    updateCartItem(cart: CartItem);
    increaseCartItemQty(id: number, qty: number): CartItem
    decreaseCartItemQty(id: number): CartItem;
    getCartItemsCostById(id: number): number;
    getCartTotalCost(shoppingCartId: number): number;
    addCatelogToCart(calelog: Catelog): boolean;
    clearCart(): void;
    getShoppingCartByCustomerId(customerId: number): ShoppingCart;
}