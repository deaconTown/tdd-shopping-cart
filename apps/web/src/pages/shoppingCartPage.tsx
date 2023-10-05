import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import SharedLayout from './sharedLayout';
import { postToTestShoppingCart } from '@/data/mock';
import { useRouter } from 'next/router'

function shoppingCartPage() {

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [shoppingCartItems, setShoppingCartItems] = useState<ShoppingCartModel[]>([])

  const router = useRouter();

  // https://fakestoreapi.com/

  const getShoppingCartItems = async () => {
    console.log('entered getShoppingCartItems')
    try {


      let cartItemsList: CartItem[] = [];
      let cart: ShoppingCartModel[] = [];
      const data = await fetch("http://localhost:4000/cartItem", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json()) // Parse the response as JSON
      // .then(data => {
      //   // console.log("data", data);


      data.map((x: CartItem) => {
        console.log("xx", x)
        // console.log("xx id", x.productId)


        const prod = getCartProducts(x.productId).then((p) => {

          const cartModel: ShoppingCartModel = {
            shoppingCartId: x.shoppingCartId,
            // customerId: x.id, 
            productName: p.name, qty: x.qty, unitPrice: p.unitPrice, productImage: ""
          }

          cart.push(cartModel);
        })
        cartItemsList.push(x);

      }
      );

      // }) // Do something with the data
      // .catch(error => console.error(error)); // Handle any errors

      console.log('cartItemsList', cartItemsList)
      console.log('carting', cart)
      setCartItems(cartItemsList);
      setShoppingCartItems(cart);
      console.log('exiting getShoppingCartItems');
      return cartItemsList;
    } catch (error) {

    }
  }

  const getCartProducts = async (productId: string) => {

    console.log('entered getCartProducts')
    // Convert the data to a JSON string
    // Use the fetch method with the POST method and the JSON data

    let product: Product = {
      id: "",
      name: "",
      isActive: false,
      unitPrice: 0,
      amountAvailable: 0,
      isInStock: false,
      description: ""
    };

    let data = await fetch(`http://localhost:4000/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log("getCartProducts", data);

        product = data;

      }) // Do something with the data
      .catch(error => console.error(error)); // Handle any errors

    // console.log('data', data)
    console.log('exiting getCartProducts');

    return product;

  };

  const getTestCart = async () => {

    console.log('entered getTestCart')
    // Convert the data to a JSON string
    // Use the fetch method with the POST method and the JSON data

    let cart: ShoppingCartModel[] = [];

    let data = await fetch(`http://localhost:4000/testShoppingCart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log("getTestCart", data);

        data.forEach((element: { id: string, name: string, unitPrice: number, availableAmount: number, isInStock: boolean, description: string, qty: number, image: string }) => {
          console.log("element", element)

          let shoppingCart: ShoppingCartModel = {
            shoppingCartId: element.id,
            productName: element.name,
            productImage: element.image,
            unitPrice: element.unitPrice,
            qty: element.qty
          }

          console.log('prev', shoppingCartItems)
          console.log('new item', shoppingCart)

          setShoppingCartItems(
            prev => [
              ...prev,
              shoppingCart
            ]
          )

        });

      })// Do something with the data
      .catch(error => console.error(error)); // Handle any errors

    console.log('data cart', cart)

    console.log('exiting getTestCart');

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

    getTestCart();



    return () => {

    }
  }, [])

  return (
    <SharedLayout>
      <main className='m-10'>

        <div >Cart Items</div>
        <>
          {
            shoppingCartItems.length > 0 ?
              shoppingCartItems?.map((carItem, key) => {
                console.log("map", carItem)
                return (

                  <div className="overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white ">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex flex-shrink-0 items-center justify-center lg:h-44 lg:w-44  sm:mx-0 sm:h-10 sm:w-10">
                          {/* <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg> */}
                          <img
                            className="h-44 w-44 object-cover object-center"
                            src={`${carItem.productImage}`}
                            alt={`${carItem.productName}`}
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{carItem.productName}</h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">{carItem.qty}</p>
                          </div>                          <div className="mt-2">
                            <p className="text-sm text-gray-500">${carItem.unitPrice * carItem.qty}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <div>No items in cart</div>
          }

          <button onClick={() => {
            router.push("/checkoutPage")
          }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-9">
            Checkout
          </button>
        </>
      </main>
    </SharedLayout>
  )
}

export default shoppingCartPage