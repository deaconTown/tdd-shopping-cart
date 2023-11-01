import React, { useEffect, useState } from "react";
import { el, faker } from "@faker-js/faker";
import SharedLayout from "./sharedLayout";
import { postToTestShoppingCart } from "@/data/mock";
import { useRouter } from "next/router";

function shoppingCartPage() {
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [shoppingCartItems, setShoppingCartItems] = useState<
  //   ShoppingCartModel[]
  // >([]);

  const [shoppingCart2Items, setShoppingCart2Items] = useState<
    ShoppingCartModel2[]
  >([]);

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

  // const getTestCart = async () => {
  //   console.log("entered getTestCart");
  //   // Convert the data to a JSON string
  //   // Use the fetch method with the POST method and the JSON data

  //   let cart: ShoppingCartModel[] = [];

  //   let data = await fetch(`http://localhost:4000/testShoppingCart`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json()) // Parse the response as JSON
  //     .then((data) => {
  //       console.log("getTestCart", data);

  //       data.forEach(
  //         (element: {
  //           id: string;
  //           name: string;
  //           unitPrice: number;
  //           availableAmount: number;
  //           isInStock: boolean;
  //           description: string;
  //           qty: number;
  //           image: string;
  //         }) => {
  //           console.log("element", element);

  //           let shoppingCart: ShoppingCartModel = {
  //             shoppingCartId: element.id,
  //             productName: element.name,
  //             productImage: element.image,
  //             unitPrice: element.unitPrice,
  //             qty: element.qty,
  //           };

  //           console.log("prev", shoppingCartItems);
  //           console.log("new item", shoppingCart);

  //           setShoppingCartItems((prev) => [...prev, shoppingCart]);
  //         }
  //       );
  //     }) // Do something with the data
  //     .catch((error) => console.error(error)); // Handle any errors

  //   console.log("data cart", cart);

  //   console.log("exiting getTestCart");

  //   // return product;
  // };
  const getTestCart2 = async () => {
    console.log("entered getTestCart");
    // Convert the data to a JSON string
    // Use the fetch method with the POST method and the JSON data

    // let cart: ShoppingCartModel2[] = [];

    let data = await fetch(`http://localhost:4000/testShoppingCart2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log("getTestCart", data);

        data.forEach(
          (element: {
            id: number,
            title: string,
            price: number,
            description: string,
            category: {
              id: number,
              name: string,
              image: string
            },
            images: string[],
          }) => {
            // console.log("element", element);


            let shoppingCart: ShoppingCartModel2 = {
              id: element.id,
              title: element.title,
              price: element.price,
              description: element.description,
              category: {
                id: element.category.id,
                name: element.category.name,
                image: element.category.image
              },
              images: element.images,
            };

            // console.log("prev", shoppingCartItems);
            // console.log("new item", shoppingCart);

            setShoppingCart2Items((prev) => [...prev, shoppingCart]);
          }
        );
      }) // Do something with the data
      .catch((error) => console.error(error)); // Handle any errors

    // console.log("data cart", shoppingCart2Items);

    console.log("exiting getTestCart");

    // return product;
  };

  useEffect(() => {
    // // populateDb();
    // const getCartItems = async () => {
    //   await getTestCart();
    // };

    // // console.log('cart', getCartItems)

    // postToTestShoppingCart();

    // getCartItems();

    getTestCart2();

    // return () => { };
  }, []);

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

    line_items: shoppingCart2Items.map(
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

    async function fetchData() {
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

        const stripeUrl =  data["session"].url;
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
    
    fetchData();
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
                    Subtotal ({`11`} items): <span className="font-bold"> ${shoppingCart2Items.reduce((acc, cur) => acc + cur.price, 0)}</span>
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
            {shoppingCart2Items.length > 0 ? (
              shoppingCart2Items?.map((carItem, key) => {
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
