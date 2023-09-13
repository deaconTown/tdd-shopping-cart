import { CartItem } from "./CartItem";

export class ShoppingCart {
    id: string;
    customerId: number;
    cartItems: CartItem[];
    isActive: boolean;
  }