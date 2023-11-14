import { DeleteCartItem } from '@/data/mock';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface ShoppingCartContextType {
    actions: { getTestCart2: () => Promise<void>; }; state: { cartItems: ShoppingCartModel2[]; };
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);
const ShoppingDispatchCartContext = createContext<React.Dispatch<React.SetStateAction<number>>>(() => { });

interface Props {
    children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: Props) => {
    const [cartAmount, setCartAmount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<
        ShoppingCartModel2[]
    >([])


    const getTestCart1 = async () => {
        console.log("entered getTestCart from index");
        // Convert the data to a JSON string
        // Use the fetch method with the POST method and the JSON data

        // let cart: ShoppingCartModel2[] = [];

        await fetch(`http://localhost:4000/testShoppingCart2`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data: ShoppingCartModel2[]) => {
                console.log("getTestCart from index", data);

                console.log(`shopping cart length ${data.length}`)
                setCartAmount(data.length);

                setCartItems(data);
            }) // Do something with the data
            .catch((error) => console.error(error)); // Handle any errors

        console.log("exiting getTestCart from index");
    };


    const getTestCart2 = useCallback(async (arg = {}) => {
        console.log("entered getTestCart from index");
        // Convert the data to a JSON string
        // Use the fetch method with the POST method and the JSON data

        await fetch(`http://localhost:4000/testShoppingCart2`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data: ShoppingCartModel2[]) => {
                console.log("getTestCart from index", data);

                console.log(`shopping cart length ${data.length}`)
                setCartAmount(data.length);

                setCartItems(data);
            }) // Do something with the data
            .catch((error) => console.error(error)); // Handle any errors

        console.log("exiting getTestCart from index");
    }, []);

    // useEffect(() => {
    //     getTestCart2();

    // }, []);

    const onDeleteCartItem = useCallback(async (cartItemId: number) => {
        try {
            // await DeleteCartItem(cartItemId);
            getTestCart2();
        } catch (error) {

        }
    }, []);

    let value = {
        actions: {
            getTestCart2,
            onDeleteCartItem
        },
        state: {
            cartItems
        }
    }


    return (
        <ShoppingCartContext.Provider value={value}>
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
        throw new Error("Shopping Cart Context must be used within the Shopping Cart Provider");
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