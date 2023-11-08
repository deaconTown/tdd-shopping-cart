import React, { useContext, useEffect, useState } from "react";
import { el, faker } from "@faker-js/faker";
import SharedLayout from "./sharedLayout";
import { DeleteCartItem, postToTestShoppingCart } from "@/data/mock";
import { useRouter } from "next/router";
import { ShoppingCartContext, ShoppingCartContextType, ShoppingCartProvider, ShoppingDispatchCartContext, useShoppingCartContext } from "@/context/ShoppingCartContext";

const shoppingCartPage =() => {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [shoppingCartItems, setShoppingCartItems] = useState<
  //   ShoppingCartModel[]
  // >([]);


  const setCartAmount = useContext(ShoppingDispatchCartContext);
  const {actions, state} = useShoppingCartContext();

  
  const [shoppingCart2Items, setShoppingCart2Items] = useState<
    ShoppingCartModel2[]
  >(state.cartItems);

  const router = useRouter();

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
  }, [actions.getTestCart2, state.cartItems.length])
  

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
      (cartItem: ShoppingCartModel2) => {


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
              name: cartItem.title,
              description: cartItem.description,
              images: cartItem.images
            },
            unit_amount: cartItem.price * 100,
            tax_behavior: 'exclusive'

          },
          quantity: 1

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

  const onDeleteCartItem = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>, cartItemId: number) => {
    console.log('entered onDeleteCartItem')
    e.preventDefault();
    await DeleteCartItem(cartItemId);
    actions.getTestCart2();

    setCartAmount(state.cartItems.length - 1);
    console.log('existing onDeleteCartItem')
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
                    Subtotal ({`${state.cartItems.length}`} items): <span className="font-bold">  ${state.cartItems.reduce((acc, cur) => acc + cur.price, 0)}</span>
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
            {state.cartItems.length > 0 ? (
              state.cartItems?.map((carItem, key) => {
                return (
                  <div key={key} className="overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full 
                  
                  ">
                    <div className="bg-white ">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex flex-shrink-0 items-center justify-center lg:h-44 lg:w-44  sm:mx-0 sm:h-10 sm:w-10">
                          <img
                            className="h-44 w-44 object-cover object-center"
                            src={`${carItem.images[0]}`}
                            alt={`${carItem.title}`}
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            className="text-base font-semibold leading-6 text-gray-900"
                            id="modal-title"
                          >
                            {carItem.title}
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-black-500 font-bold">
                              {/* ${carItem.price * carItem.qty} */}
                              ${carItem.price * 1}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {/* {carItem.qty} */}
                              {1}
                            </p>
                          </div>
                          <div className="mt-auto">
                            <button
                              type="submit"
                              onClick={(e) => { onDeleteCartItem(e,carItem.id) }}
                              className="bg-red-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md w-full"
                            >
                              Remove
                            </button>
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
      </main>
    </SharedLayout>
  );
}

export default shoppingCartPage;
