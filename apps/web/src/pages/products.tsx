import React, { useContext, useEffect, useState } from "react";
import { el, faker } from "@faker-js/faker";
import SharedLayout from "./sharedLayout";
import { getTestCart2, postToTestShoppingCart } from "@/data/mock";
import { useRouter } from "next/router";
import { ShoppingCartContext, ShoppingDispatchCartContext } from "@/context/ShoppingCartContext";

function productPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shoppingCart2Items, setShoppingCart2Items] = useState<ShoppingCartModel2[]>([]);

  const router = useRouter();

  const cartAmount = useContext(ShoppingCartContext);


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
        <div className="max-w-[1320] mx-auto">
          <h1 className="text-4xl text-center py-5">
            Featured Products
          </h1>
        </div>


        <div className="max-w-[1320] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px]">
          {shoppingCart2Items.length > 0 ? (
            shoppingCart2Items?.map((carItem, key) => {

              return (
                <div className="text-center shadow-lg rounded">
                  <div className="overflow-hidden flex flex-col h-full">
                    <div className="flex-1">
                      <img className="hover:scale-125 duration-1000 w-full max:h-96" src={`${carItem.images[0]}`} alt={`${carItem.title}`} />
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
            <div>No products available</div>
          )}
        </div>


      </main>
    </SharedLayout>
  );
}

export default productPage;
