import React, { useEffect, useState } from "react";
import { el, faker } from "@faker-js/faker";
import SharedLayout from "./sharedLayout";
import { getTestCart2, postToTestShoppingCart } from "@/data/mock";
import { useRouter } from "next/router";

function productPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shoppingCart2Items, setShoppingCart2Items] = useState<ShoppingCartModel2[]>([]);

  const router = useRouter();


  useEffect(() => {

    let getProducts = async () => {
      await getTestCart2().then((prods) => {

        setShoppingCart2Items(prods);
      });
    }

    getProducts();

    return () => { };
  }, []);

  const postToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    console.log('entered postToCart')
    event.preventDefault();

    // Convert the data to a JSON string
    try {

      const cartItemToPost = shoppingCart2Items.find(x => x.id == id);
      let jsonData = JSON.stringify(cartItemToPost);

      // Use the fetch method with the POST method and the JSON data
      fetch("http://localhost:4000/testShoppingCart2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonData
      })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => console.log(data)) // Do something with the data
        .catch(error => console.error(error)); // Handle any errors
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
          Items R Us Products
        </div>
        <div id="cart-items" className="md:flex md:flex-column">
          <section className="order-last md:order-1 ">
            {shoppingCart2Items.length > 0 ? (
              shoppingCart2Items?.map((carItem, key) => {
                console.log("map", carItem);
                // sm:max-w-full md:max-w-3xl lg:max-w-4xl
                return (
                  <div className="overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full 
                  
                  ">
                    <div className="bg-white ">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex flex-shrink-0 items-center justify-center lg:h-44 lg:w-24  sm:mx-0 sm:h-10 sm:w-10">
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
                              ${carItem.price}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-green-500 font-semibold">
                              IN STOCK
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {carItem.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <button
                            type="submit"
                            onClick={(e) => postToCart(e, carItem.id)}
                            className="bg-green-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md w-full"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No products available</div>
            )}
          </section>
        </div>
      </main>
    </SharedLayout>
  );
}

export default productPage;
