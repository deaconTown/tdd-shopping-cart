import { CartItem } from "../Entities/CartItem";
import { Product } from "../Entities/Product";
import { ShoppingCartService } from "../Services/shoppingCart.service";
import { ProductService } from "../Services/product.service";
import { Catelog } from "../Entities/Catelog";
import { CatelogItem } from "../Entities/CatelogItem";
import { IShoppingCartService } from "../Interfaces/IShoppingCart.interface";
import { Test, TestingModule } from "@nestjs/testing";

describe('ShoppingCart', () => {
  let shoppingCart: IShoppingCartService;
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    shoppingCart = new ShoppingCartService(productService);
  });



  it('should get all items from cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
    let product2: Product = { id: 2, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
    let product3: Product = { id: 3, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    //TODO: LEARN HOW TO MOCK THIS
    productService.addProduct(product1);
    productService.addProduct(product2);
    productService.addProduct(product3);

    // jest.spyOn(productService, 'getProductById').mockImplementation(() => product1);
    // jest.spyOn(productService, 'getProductById').mockImplementation(() => product2);
    // jest.spyOn(productService, 'getProductById').mockImplementation(() => product3);

    let cart1: CartItem = { id: 1, productId: product1.id, qty: 1, shoppingCartId: 1 }
    let cart2: CartItem = { id: 2, productId: product2.id, qty: 1, shoppingCartId: 1 }
    let cart3: CartItem = { id: 3, productId: product3.id, qty: 1, shoppingCartId: 1 }

    shoppingCart.addItem(cart1);
    shoppingCart.addItem(cart2);
    shoppingCart.addItem(cart3);

    let cartItem = shoppingCart.getCartItems();
    expect(cartItem.length).toEqual(3);
  });


  // must be able to add a cart
  it('should add new items to the cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);

    let cartItem = shoppingCart.getCartItemsById(2);
    expect(cartItem.id).toEqual(2);
  });

  it('should not create a new item when item already exists in the cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);

    let cartItems = shoppingCart.getCartItems();

    //assert that length of cart stays the same
    expect(cartItems.length).toEqual(1);
  });

  it('should update existing item in the cart', () => {

    //add new item to cart
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
    let product2: Product = { id: 2, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);
    productService.addProduct(product2);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);

    //attempt to add item with the same id with new property values
    cart1 = { id: 2, productId: 2, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1); //

    //add the item twice, each with same id, but different qty/name then assert that the cart item has the same id and latest change
    let cartResult = shoppingCart.getCartItemsById(2);
    expect(cartResult.productId).toEqual(2);
  });

  it('should return false when when cart item does not exists', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }

    let cartItemExist = shoppingCart.checkExists(cart1);
    expect(cartItemExist).toEqual(false);
  });

  it('should return true when cart item does exists', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);

    let cartItemExist = shoppingCart.checkExists(cart1);
    expect(cartItemExist).toEqual(true);
  });

  it('should get cart item by id', () => {

    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
    let product2: Product = { id: 3, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    //TODO: LEARN HOW TO MOCK THIS
    productService.addProduct(product1);
    productService.addProduct(product2);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    let cart2: CartItem = { id: 3, productId: product2.id, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);
    shoppingCart.addItem(cart2);

    let cartItem = shoppingCart.getCartItemsById(3);
    expect(cartItem.productId).toEqual(3);
  });

  it('cart item qty should only increase by 1 when qty value is not specified when adding item to cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);

    let cartItem = shoppingCart.getCartItemsById(2);

    expect(cartItem.qty).toEqual(1);
  });

  it('should remove items from the cart by id', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
    let product2: Product = { id: 2, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    //TODO: LEARN HOW TO MOCK THIS
    productService.addProduct(product1);
    productService.addProduct(product2);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    let cart2: CartItem = { id: 3, productId: 3, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);
    shoppingCart.addItem(cart2);
    shoppingCart.removeItem(1);

    let cartItem = shoppingCart.getCartItems();
    expect(cartItem[0].id).toEqual(2);

    // assert.deepEqual(cartItem[0].id, 2);
  });

  it('should remove all items in the cart', () => {

    shoppingCart.clearCart();

    let cartItems = shoppingCart.getCartItems();

    expect(cartItems.length).toEqual(0);
  });

  // total amount of unique items should increase by 1
  it('should increase cart item qty by 1', () => {

    //arrange 

    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }
    shoppingCart.addItem(cart1);

    //act

    let cartItem = shoppingCart.increaseCartItemQty(2, 1);

    //assert
    expect(cartItem.qty).toEqual(2);
  });

  // must be able to increase the qty of the products in the cart

  // when same item is added to the cart, the qty should increase in the cart
  it('should increase cart item qty by specified amount when already exists in cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 22, productId: product1.id, qty: 3, shoppingCartId: 1 }

    shoppingCart.addItem(cart1);
    // cart.addItem(cart2);

    let cartItem = shoppingCart.increaseCartItemQty(cart1.id, 4);

    console.log('cartItem', cartItem)

    expect(cartItem.qty).toEqual(7);

  });


  // must be able to decrease the qty of the products in the cart
  it('should decrease cart item qty by 1', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 2, shoppingCartId: 1 }

    shoppingCart.addItem(cart1);

    //act

    let cartItem = shoppingCart.decreaseCartItemQty(2);

    //assert
    expect(cartItem.qty).toEqual(1);
  });

  // items in the cart below 1 should be removed form the cart automatically
  it('should remove item from cart when qty is zero', () => {
    //arrange 
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    productService.addProduct(product1);

    let cart1: CartItem = { id: 2, productId: product1.id, qty: 1, shoppingCartId: 1 }

    shoppingCart.addItem(cart1);

    shoppingCart.decreaseCartItemQty(cart1.id);

    let result = shoppingCart.checkExists(cart1);

    expect(result).toEqual(false);
  });


  // (cost per item) subtotal should be calculated by the qty * unit price
  it('should return correct cost for a single item in cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    // const result = jest.spyOn(productService, 'addProduct').mockImplementation(() => product1).mockReturnThis();

    // console.log('result', result)

    //TODO: LEARN HOW TO MOCK THIS
    productService.addProduct(product1);

    let p = productService.getProductById(product1.id);

    console.log('p', p)

    let cart1: CartItem = { id: 1, productId: product1.id, qty: 1, shoppingCartId: 1 }

    shoppingCart.addItem(cart1);

    let expected = product1.unitPrice * cart1.qty;

    let cost = shoppingCart.getCartItemsCostById(1);

    expect(cost).toEqual(expected)
  });

  it('should return correct total cost for all the items in cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };
    let product2: Product = { id: 2, name: 'SWP EFun Earphones', isActive: true, unitPrice: 34.99, amountAvailable: 5, isInStock: true };

    // const result = jest.spyOn(productService, 'addProduct').mockImplementation(() => product1).mockReturnThis();

    // console.log('result', result)

    //TODO: LEARN HOW TO MOCK THIS
    productService.addProduct(product1);
    productService.addProduct(product2);


    let cart1: CartItem = { id: 1, productId: product1.id, qty: 2, shoppingCartId: 1 }
    let cart2: CartItem = { id: 2, productId: product2.id, qty: 1, shoppingCartId: 1 }

    shoppingCart.addItem(cart1);
    shoppingCart.addItem(cart2);

    let expected = (product1.unitPrice * cart1.qty) + (product2.unitPrice * cart2.qty);

    let totalCost = shoppingCart.getCartTotalCost(1);

    expect(totalCost).toEqual(expected);
  });

  // each customer should have a unique cart, one to one



  it('should not be able to add an inActive product to cart', () => {
    let product1: Product = { id: 1, name: 'red shoes', isActive: false, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    //TODO: LEARN HOW TO MOCK THIS
    productService.addProduct(product1);

    let cart1: CartItem = { id: 1, productId: product1.id, qty: 1, shoppingCartId: 1 }

    shoppingCart.addItem(cart1);

    let expected = shoppingCart.getCartItems().length;

    expect(expected).toEqual(0);
  });

  it('should be able to add active catelog to cart', () => {
    let catelogItemList: CatelogItem[] = [];
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 5, isInStock: true };

    //TODO: LEARN HOW TO MOCK THIS
    productService.addProduct(product1);

    let catelogItem1 : CatelogItem = {id: 1, productId: product1.id, qty: 3}

    catelogItemList.push(catelogItem1);


    let calelog1: Catelog = { id: 1, name: 'electronic special', isActive: true, category: 'electronics', items: catelogItemList };


    let result = shoppingCart.addCatelogToCart(calelog1);
    let expected = shoppingCart.getCartItemsById(1);

    expect(result).toEqual(true);
    expect(expected.qty).toEqual(3);

  });

  //TODO: NOT SURE WHY THIS IS PASSING - INVESTIGATE
  it('should not be able to add an inActive catelog to cart', () => {
    let catelogItemList: CatelogItem[] = [];
    let product1: Product = { id: 1, name: 'red shoes', isActive: true, unitPrice: 10.00, amountAvailable: 2, isInStock: true };

    let catelogItem1 : CatelogItem = {id: 1, productId: product1.id, qty: 2}

    catelogItemList.push(catelogItem1);


    let calelog1: Catelog = { id: 1, name: 'electronic special', isActive: true, category: 'electronics', items: catelogItemList };


    let result = shoppingCart.addCatelogToCart(calelog1);
    let expected = shoppingCart.getCartItems().length;

    expect(result).toEqual(true);
    expect(expected).toEqual(0);
  });


  // it('should update product availableAmount when added to sold', () => {
  //   expect.assertions(1)
  // });



});


