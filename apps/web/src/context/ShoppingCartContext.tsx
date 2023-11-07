import React, { createContext, useContext, useEffect, useState } from 'react';

const ShoppingCartContext = createContext<{ cartAmount: number; cartItems: ShoppingCartModel2[] }>({ cartAmount: 0, cartItems: [] });
const ShoppingDispatchCartContext = createContext<React.Dispatch<React.SetStateAction<number>>>(() => { });

interface Props {
    children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: Props) => {
    const [cartAmount, setCartAmount] = useState<number>(0);
    const [shoppingCart2Items, setShoppingCart2Items] = useState<
        ShoppingCartModel2[]
    >([])


    const getTestCart2 = async () => {
        console.log("entered getTestCart from index");
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
                console.log("getTestCart from index", data);

                console.log(`shopping cart length ${data.length}`)
                setCartAmount(data.length);

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

                        setShoppingCart2Items((prev) => [...prev, shoppingCart]);

                    }
                );
            }) // Do something with the data
            .catch((error) => console.error(error)); // Handle any errors

        console.log("exiting getTestCart from index");
    };

    useEffect(() => {
        getTestCart2();

    }, [cartAmount])


    return (
        <ShoppingCartContext.Provider value={{ cartAmount: cartAmount, cartItems: shoppingCart2Items }}>
            <ShoppingDispatchCartContext.Provider value={setCartAmount}>
                {children}
            </ShoppingDispatchCartContext.Provider>
        </ShoppingCartContext.Provider>
    )
}

export { ShoppingCartContext, ShoppingDispatchCartContext, ShoppingCartProvider }

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useShoppingCartContext() {
    const context = useContext(ShoppingCartContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

// // Create a hook to use the APIContext, this is a Kent C. Dodds pattern
// export function useShoppingCartDispatchContext() {
//     const context = useContext(ShoppingDispatchCartContext);
//     if (context === undefined) {
//         throw new Error("Context must be used within a Provider");
//     }
//     return context;
// }