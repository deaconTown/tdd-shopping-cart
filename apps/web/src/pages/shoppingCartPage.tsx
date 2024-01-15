import React, { useContext, useEffect, useState } from "react";
import { el, faker } from "@faker-js/faker";
import SharedLayout from "./sharedLayout";
import { DeleteCartItem, getTestProducts, getTestProductsByCategory, postToTestShoppingCart } from "@/data/mock";
import { useRouter } from "next/router";
import { ShoppingCartContext, ShoppingCartContextType, ShoppingCartProvider, ShoppingDispatchCartContext, useShoppingCartContext } from "@/context/ShoppingCartContext";
import QuantitySelector from "@/components/QuantitySelector";
import { guidGenerator } from "@/commonUtil/util";

const ShoppingCartPage: React.FC = () => {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [shoppingCartItems, setShoppingCartItems] = useState<
  //   ShoppingCartModel[]
  // >([]);


  const setCartAmount = useContext(ShoppingDispatchCartContext);
  const { actions, state } = useShoppingCartContext();


  const [shoppingCart2Items, setShoppingCart2Items] = useState<
    CartItem[] | undefined
  >(state.cartItems);
  const [quantity, setQuantity] = useState(state.cartItems?.length);

  const router = useRouter();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    // Find the index of the item in the cart
    // const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    // // Create a copy of the cartItems array to avoid mutating state directly
    // const updatedCart = [...cartItems];

    // // Update the quantity of the specific item
    // updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity: newQuantity };

    // // Set the updated cart state
    // setCartItems(updatedCart);

    // Make the fetch request to update the server with the new quantity
    console.log('change is happenin')
    actions.updateCartItemQuantity(itemId, newQuantity);

    actions.getTestCart2();
  };

  // https://fakestoreapi.com/

  // const getShoppingCartItems = async () => {
  //   console.log("entered getShoppingCartItems");
  //   try {
  //     let cartItemsList: CartItem[] = [];
  //     let cart: ShoppingCartModel[] = [];
  //     const data = await fetch("http://localhost:4000/cartItem", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((response) => response.json()); // Parse the response as JSON
  //     // .then(data => {
  //     //   // console.log("data", data);

  //     data.map((x: CartItem) => {
  //       console.log("xx", x);
  //       // console.log("xx id", x.productId)

  //       const prod = getCartProducts(x.productId).then((p) => {
  //         const cartModel: ShoppingCartModel = {
  //           shoppingCartId: x.shoppingCartId,
  //           // customerId: x.id,
  //           productName: p.name,
  //           qty: x.qty,
  //           unitPrice: p.unitPrice,
  //           productImage: "",
  //         };

  //         cart.push(cartModel);
  //       });
  //       cartItemsList.push(x);
  //     });

  //     // }) // Do something with the data
  //     // .catch(error => console.error(error)); // Handle any errors

  //     console.log("cartItemsList", cartItemsList);
  //     console.log("carting", cart);
  //     setCartItems(cartItemsList);
  //     setShoppingCartItems(cart);
  //     console.log("exiting getShoppingCartItems");
  //     return cartItemsList;
  //   } catch (error) { }
  // };

  // const getCartProducts = async (productId: string) => {
  //   console.log("entered getCartProducts");
  //   // Convert the data to a JSON string
  //   // Use the fetch method with the POST method and the JSON data

  //   let product: Product = {
  //     id: "",
  //     name: "",
  //     isActive: false,
  //     unitPrice: 0,
  //     amountAvailable: 0,
  //     isInStock: false,
  //     description: "",
  //   };

  //   let data = await fetch(`http://localhost:4000/product/${productId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json()) // Parse the response as JSON
  //     .then((data) => {
  //       console.log("getCartProducts", data);

  //       product = data;
  //     }) // Do something with the data
  //     .catch((error) => console.error(error)); // Handle any errors

  //   // console.log('data', data)
  //   console.log("exiting getCartProducts");

  //   return product;
  // };



  // useEffect(() => {
  //   // // populateDb();
  //   // const getCartItems = async () => {
  //   //   await getTestCart();
  //   // };

  //   // // console.log('cart', getCartItems)

  //   // postToTestShoppingCart();

  //   // getCartItems();

  //   getTestCart2();

  //   // return () => { };
  // }, []);

  // const [clientSecret, setClientSecret] = useState('');
  // const [paymentIntent, setPaymentIntent] = useState('');

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads using our local API
  //   fetch('api/stripe_payment_intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       amount: 30000,
  //       payment_intent_id: '',
  //       description: 'this is a test'
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setClientSecret(data.client_secret), setPaymentIntent(data.id);
  //     });
  // }, []);

  useEffect(() => {
    // setShoppingCart2Items(cartItems);


    // return () => {

    // }
    actions.getTestCart2();
  }, [actions.getTestCart2, state.cartItems?.length])


  useEffect(() => {
    console.log(`cart items from context : ${state.cartItems}`)
  }, [state.cartItems]);

  const onPostToStripe = async () => {

    let lineItems: {
      price_data: {
        currency: string,
        product_data: {
          name: string,
          description: string,
          images: string[]
        },
        unit_amount: number,
        tax_behavior: string,
      },
      // adjustable_quantity: {
      //   enabled: true,
      //   minimum: 1,
      //   maximum: 10,
      // },
      quantity: number

    }[] = [];

    line_items: state.cartItems!.map(
      (cartItem: CartItem) => {



        let lineItem: {
          price_data: {
            currency: string,
            product_data: {
              name: string,
              description: string,
              images: string[]
            },
            unit_amount: number,
            tax_behavior: string,
          },
          // adjustable_quantity: {
          //   enabled: true,
          //   minimum: 1,
          //   maximum: 10,
          // },
          quantity: number

        } = {
          price_data: {
            currency: 'usd',
            product_data: {
              name: cartItem.product.title,
              description: cartItem.product.description,
              images: cartItem.product.images
            },
            unit_amount: cartItem.product.price * 100,
            tax_behavior: 'exclusive'

          },
          quantity: cartItem.qty

        }
        lineItems.push(lineItem);

        return lineItems;
      }
    )

    async function postToStripe() {
      try {
        const response = await fetch('api/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lineItems),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log("stripe response", data);
        console.log("stripe response", data["session"].url);

        const stripeUrl = data["session"].url;
        if (stripeUrl) {
          console.log("stripe url", data.url);
          // If you want to navigate to the URL, you can use router.push(data.url) here.

          router.push(stripeUrl);
        } else {
          console.log("Stripe response did not contain a URL.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postToStripe();
  }

  const onDeleteCartItem = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, cartItemId: string) => {
    console.log('entered onDeleteCartItem')
    e.preventDefault();
    await DeleteCartItem(cartItemId);
    actions.getTestCart2();

    if (state.cartItems) {
      setCartAmount(state.cartItems?.length - 1);
    }
    console.log('existing onDeleteCartItem')
  }

  const [products, setProducts] = useState<Product[]>([]);

  // const router = useRouter();

  // const { actions, state } = useShoppingCartContext();


  useEffect(() => {

    // let getProducts = async () => {
    //   await getTestCart2().then((prods) => {

    //     // setShoppingCart2Items(prods);
    //   });
    // }

    let getTestProductsFromApi = async () => {
      console.log(`state.cartItems: ${state.cartItems}`)
      await getTestProductsByCategory(state.cartItems != undefined? state.cartItems[0].product.category.name : '').then((prods) => {

        setProducts(prods);
      });
    }

    getTestProductsFromApi();
    // getProducts();

    return () => { };
  }, [state.cartItems]);

  const postToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    console.log('entered postToCart')
    event.preventDefault();

    // Convert the data to a JSON string
    try {

      const cartItemToAdd = products.find(x => x.id == id);

      if (cartItemToAdd != undefined) {

        //check if item already exists in the cart
        const foundCartItem = state.cartItems?.find(x => x.product.id == cartItemToAdd.id);

        if (foundCartItem !== undefined) {
          actions.updateCartItemQuantity(foundCartItem.id, foundCartItem.qty + 1);
        }
        else {

          const dataToPost: CartItem = {
            id: guidGenerator(),
            shoppingCartId: state.shoppingCartId ?? guidGenerator(),
            product: cartItemToAdd,
            qty: 1
          }
          let jsonData = JSON.stringify(dataToPost);

          console.log('jsonData from products page', jsonData)

          // Use the fetch method with the POST method and the JSON data
          fetch(`${process.env.NEXT_PUBLIC_CARTBASEURL}/testShoppingCart2`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: jsonData
          })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => console.log(data)) // Do something with the data
            .catch(error => console.error(error)); // Handle any errors
        }
        actions.getTestCart2();

      }

    } catch (error) {
      console.log(`Failed to post new cart item. Error: ${error}`)
    }


    console.log('exiting postToShoppingCart')
  }



  return (
    <SharedLayout>
      <main className="m-10 md:m-6">
        <div
          id="cart-header"
          className="my-12 font-semibold text-center md:my-6 md:text-left text-2xl md:text-3xl transition-all"
        >
          Shopping Cart
        </div>
        <div id="cart-items" className="md:flex md:flex-row">
          <section className="order-first md:order-2 md:basis-1/3 mb-10 sm:mt-8 md:ml-4">
            <div className="bg-white shadow-xl border-2 rounded-lg lg:h-44 p-8 sm:p-6 flex flex-grow flex-col">
              <div className="basis-2/3 break-words">
                {/* <div className="bg-blue-500 flex-grow h-20"> */}
                <div className="flex-grow h-20">
                  <div className="md:h-1/2">Some promotional text</div>
                  <p className="text-xl font-semibold md:h-1/2">
                    Subtotal ({`${state.cartItems?.length}`} items): <span className="font-bold">  ${state.cartItems?.reduce((acc, cur) => acc + cur.product.price * cur.qty, 0)}</span>
                  </p >
                </div>
              </div>

              <div className="basis-1/3">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // router.push("/checkoutPage");
                    // router.push(`/api/stripe/${paymentIntent}`);
                    // router.push(`/api/stripe/${shoppingCart2Items.reduce((acc, cur) => acc + cur.price, 0)}`);
                    onPostToStripe();
                  }}
                  className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
                >
                  Checkout
                </button>
              </div>
            </div>
          </section>
          <section className="order-last md:order-1 md:basis-2/3 ">
            {state.cartItems !== undefined && state.cartItems.length > 0 ? (
              state.cartItems.map((carItem, key) => {
                return (
                  <div key={key} className="overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full 
                  
                  ">
                    <div className="bg-white ">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex flex-shrink-0 items-center justify-center lg:h-44 lg:w-44  sm:mx-0 sm:h-10 sm:w-10">
                          <img
                            className="h-44 w-44 object-cover object-center"
                            src={`${carItem.product.images[0]}`}
                            alt={`${carItem.product.title}`}
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            className="text-base font-semibold leading-6 text-gray-900"
                            id="modal-title"
                          >
                            {carItem.product.title}
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-black-500 font-bold">
                              {/* ${carItem.price * carItem.qty} */}
                              ${carItem.product.price * carItem.qty}
                            </p>
                          </div>

                          <div id='cart-item-actions' className="flex">
                            <div key={carItem.id} className="pr-4">
                              <QuantitySelector quantity={carItem.qty ?? 0} onQuantityChange={(newQuantity) => handleQuantityChange(carItem.id, newQuantity)} />
                            </div>
                            <div className="mt-auto">
                              <button
                                type="submit"
                                onClick={(e) => { onDeleteCartItem(e, carItem.id) }}
                                className="bg-red-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md w-full"
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No items in cart</div>
            )}
          </section>
        </div>
        <section>

          <div className="max-w-[1320] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px]">
            {products.length > 0 ? (
              products?.map((carItem, key) => {

                return (
                  <div key={key} className="text-center shadow-lg rounded">
                    <div className="overflow-hidden flex flex-col h-full">
                      <div className="flex-1">
                        <img className="hover:scale-125 duration-1000 w-full h-80" src={`${carItem.images[0]}`} alt={`${carItem.title}`} />
                        <h3 className="py-2 text-2xl">
                          {carItem.title}
                        </h3>
                        <p className="py-2 font-bold text-2xl">${carItem.price}</p>
                        <p className="py-2">{carItem.description}</p>
                      </div>


                      <div className="mt-auto">
                        <button
                          type="submit"
                          onClick={(e) => postToCart(e, carItem.id)}
                          className="mt-auto bg-green-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md w-full"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </section>

      </main>
    </SharedLayout>
  );
}

export default ShoppingCartPage;
