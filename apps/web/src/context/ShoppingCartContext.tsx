import { guidGenerator } from '@/commonUtil/util';
import { DeleteCartItem } from '@/data/mock';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';


interface actionTypes {
    getTestCart2: (arg?: {}) => Promise<void>,
    onDeleteCartItem: (cartItemId: number) => Promise<void>,
    updateCartItemQuantity: (cartItemId: string, newQuantity: number) => void
}

interface stateTypes {
    cartItems: CartItem[] | undefined
    shoppingCartId: string | undefined
}


export interface ShoppingCartContextType {
    actions: actionTypes;
    state: stateTypes;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);
const ShoppingDispatchCartContext = createContext<React.Dispatch<React.SetStateAction<number>>>(() => { });

interface Props {
    children: React.ReactNode;
}

const ShoppingCartProvider = ({ children }: Props) => {
    const [cartAmount, setCartAmount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<
        CartItem[] | undefined
    >(undefined);

    const [shoppingCartId, setShoppingCartId] = useState('');

    useEffect(() => {
        setShoppingCartId(guidGenerator());

        return () => {

        }
    }, [])


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
            .then((data: CartItem[]) => {
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
            .then((data: CartItem[]) => {
                console.log("getTestCart from context", data);

                console.log(`context shopping cart length ${data.length}`)
                setCartAmount(data.length);

                setCartItems(data);
            }) // Do something with the data
            .catch((error) => console.error(error)); // Handle any errors

        console.log("exiting getTestCart from index");
    }, []);

    // useEffect(() => {
    //     getTestCart2();

    // }, []);

    const updateCartItemQuantity = (cartItemId: string, newQuantity: number) => {
        // Replace the URL with your actual API endpoint
        // const apiUrl = `http://localhost:4000/testShoppingCart2/${cartItemId}`;
        const apiUrl = `http://localhost:4000/testShoppingCart2/${cartItemId}`;



        // Make a fetch request to update the quantity
        let foundCartItem = cartItems?.find(x => x.id == cartItemId);
        if (foundCartItem !== undefined) {
            const cartItemToUpdate: CartItem = { ...foundCartItem, qty: newQuantity };

            fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItemToUpdate),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to update quantity');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Quantity updated successfully:', data);
                    // Handle success, if needed
                })
                .catch((error) => {
                    console.error('Error updating quantity:', error);
                    // Handle error, if needed
                });
        }
        else {
            console.error('Error updating quantity: no cart item with that id found');
        }


    };

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
            onDeleteCartItem,
            updateCartItemQuantity
        },
        state: {
            cartItems,
            shoppingCartId: shoppingCartId
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