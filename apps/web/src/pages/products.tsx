import React, { useContext, useEffect, useState } from "react";
import { el, faker } from "@faker-js/faker";
import SharedLayout from "./sharedLayout";
import { getTestCart2, getTestCategories, getTestProducts, getTestProductsByCategory, postToTestShoppingCart } from "@/data/mock";
import { useRouter } from "next/router";
import { ShoppingCartContext, ShoppingDispatchCartContext, useShoppingCartContext } from "@/context/ShoppingCartContext";
import { randomUUID } from "crypto";
import { guidGenerator } from "@/commonUtil/util";
import ProductBanner from "@/components/ProductBanner";

const ProductPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shoppingCart2Items, setShoppingCart2Items] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([])

  const router = useRouter();

  const { actions, state } = useShoppingCartContext();

  useEffect(() => {

    let getProducts = async () => {
      await getTestCart2().then((prods) => {

        // setShoppingCart2Items(prods);
      });
    }

    let getTestProductsFromApi = async () => {
      await getTestProducts().then((prods) => {

        setShoppingCart2Items(prods);

      });
      await getTestCategories().then((categories) => {

        setProductCategories(categories);
        console.log('category', categories)
        // console.log('category name', categories[0]?.name)
        // console.log('category image', categories[0]?.image)
      });
    }

    getTestProductsFromApi();
    getProducts();

    return () => { };
  }, []);

  const postToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    console.log('entered postToCart')
    event.preventDefault();

    // Convert the data to a JSON string
    try {

      const cartItemToAdd = shoppingCart2Items.find(x => x.id == id);

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

  const getCategoryImage = (category: string) => {
    let imgUrl = "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    switch (category) {
      case "electronics":
        imgUrl = "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        break;
      case "jewelery":
        imgUrl = "https://images.unsplash.com/photo-1640353806012-ba33732504d5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        break;
      case "men's clothing":
        imgUrl = "https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        break;
      default:
        break;
    }
    return imgUrl;
  }



  return (
    <SharedLayout>

      <ProductBanner productItems={shoppingCart2Items} />

      <div  className="m-10 md:m-6">
        <h1 className="text-4xl text-left py-5 font-extrabold ml-6">
          Shop Our Top Categories
        </h1>
        <div className="rounded-lg max-w-[1320] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px]">
          {productCategories?.map((prod, index) => {

            return <div className="flex-1 flex flex-col mb-6 ml-8">
              <div className="flex justify-center">
              <img key={prod} className="w-full h-96" src={getCategoryImage(prod)} alt={prod} />
              </div>
            </div>
          })}
        </div>
      </div>


      <main className="m-10 md:m-6">
        <div className="max-w-[1320] mx-auto">
          <h1 className="text-4xl text-left py-5 font-extrabold ml-6">
            Products For You!
          </h1>
        </div>

        <div className="max-w-[1320] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px]">
          {shoppingCart2Items.length > 0 ? (
            shoppingCart2Items?.map((carItem, key) => {

              return (
                // <div className="border-solid border-2 border-gray-500 rounded-[25px]">
                <div className="border-solid border-2 border-gray-200 rounded-[25px]">
                  <div key={key} className="text-center">
                    <div className="overflow-hidden flex flex-col h-full">
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-center">
                          {/* <div class="flex flex-wrap">
  <img src="image1.jpg" class="w-1/2 h-48 object-cover" alt="Image 1">
  <img src="image2.jpg" class="w-1/2 h-48 object-cover" alt="Image 2">
  <img src="image3.jpg" class="w-1/2 h-48 object-cover" alt="Image 3">
  <img src="image4.jpg" class="w-1/2 h-48 object-cover" alt="Image 4">
</div> */}
                          {/* <img className=" hover:scale-125 duration-1000 w-full h-80" src={`${carItem.images[0]}`} alt={`${carItem.title}`} /> */}
                          {/* <img className="scale-75 my-8 hover:scale-125 duration-1000 px-24" src={`${carItem.images[0]}`} alt={`${carItem.title}`} /> */}
                          <img className="h-48 my-2 hover:scale-125 duration-1000 px-18" src={`${carItem.images[0]}`} alt={`${carItem.title}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div key={key} className="text-center rounded h-38">
                    <div className="overflow-hidden flex flex-col h-full">
                      <div className="flex-1 flex flex-row justify-between">

                        <h3 className="py-2 font-bold text-1xl px-2 text-left">
                          {carItem.title}
                        </h3>

                        <p className="py-2 font-bold text-2xl px-2">${carItem.price}</p>
                      </div>
                      {/* <p className="py-2">{carItem.category.name}</p> */}
                      {/* <p className="py-2">{carItem.description}</p> */}

                      <div className="mt-auto flex mb-2 ml-2">
                        <button
                          type="submit"
                          onClick={(e) => postToCart(e, carItem.id)}
                          className="mt-auto hover:bg-[#003d29] hover:text-white font-bold py-2 px-4 rounded-full w-1/2 border-2 border-black"
                        >
                          Add to Cart
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
        </div>


      </main>
    </SharedLayout>
  );
}

export default ProductPage;
