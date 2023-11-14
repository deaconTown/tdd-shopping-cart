interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}


interface ShoppingCart {
  id: string;
  customerId: string;
  isActive: boolean;
}

// interface Product {
//   id: string;
//   name: string;
//   isActive: boolean;
//   unitPrice: number;
//   amountAvailable: number;
//   isInStock: boolean;
//   description: string;
// }

interface ShoppingCartModel {
  shoppingCartId: string;
  // customerId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  qty: number;
}


interface Product {
  id: string,
  title: string,
  price: number,
  description: string,
  category: {
    id: number,
    name: string,
    image: string
  },
  images: string[],
  amountAvailable: number;
  isInStock: boolean;
  isActive: boolean;
}

interface CartItem {
  id: string,
  shoppingCartId: string,
  product: Product,
  qty: number
}

// interface CartItem {
//   id: string;
//   shoppingCartId: string;
//   productId: string;
//   qty: number
// }

interface ShoppingCartModel2 {
  id: string,
  cartItems: CartItem[],
}
