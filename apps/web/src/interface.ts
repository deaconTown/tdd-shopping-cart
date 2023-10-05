interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
  }
  
  interface CartItem {
    id: string;
    shoppingCartId: string;
    productId: string;
    qty: number
  }
  interface ShoppingCart {
    id: string;
    customerId: string;
    isActive: boolean;
  }
  
  interface Product {
    id: string;
    name: string;
    isActive: boolean;
    unitPrice: number;
    amountAvailable: number;
    isInStock: boolean;
    description: string;
  }

  interface ShoppingCartModel {
    shoppingCartId: string;
    // customerId: string;
    productName: string;
    productImage: string;
    unitPrice: number;
    qty: number;    
  }