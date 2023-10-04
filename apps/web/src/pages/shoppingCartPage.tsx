import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import SharedLayout from './sharedLayout';
import { postToTestShoppingCart } from '@/data/mock';

function shoppingCartPage() {

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [shoppingCartItems, setShoppingCartItems] = useState<ShoppingCartModel[]>([])

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
      <main>
        <div >Cart Items</div>
        <>
          <div id="nav-space" className='mb-100'></div>

          <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
            // style="background-image: url('/img/card-left.jpg')" 
            title="Woman holding a mug">
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
                <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              </div>
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/>
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                    <p className="text-gray-600">Aug 18</p>
                  </div>
              </div>
            </div>
          </div>

          {
            shoppingCartItems.length > 0 ?
              shoppingCartItems?.map((carItem, key) => {
                console.log("map", carItem)
                return (
                  <div className=''>
                    <div key={Math.random() * 10} >{carItem.productName}</div>
                    <img
                      className="h-32 w-32 rounded-lg object-cover object-center"
                      src={`${carItem.productImage}`}
                      alt={`${carItem.productName}`}
                    />
                    <div key={Math.random() * 10}>{carItem.unitPrice}</div>
                    <div key={Math.random() * 10}>{carItem.qty}</div>
                  </div>)
              })
              :
              <div>No items in cart</div>
          }
        </>
      </main>
    </SharedLayout>
  )
}

export default shoppingCartPage