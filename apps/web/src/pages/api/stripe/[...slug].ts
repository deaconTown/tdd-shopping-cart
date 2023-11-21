import { getTestCart2 } from "@/data/mock";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";


// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Nzfu3Ik0Fd7YGJ9QAwrjQC6yefPOOkLEySARmorKmKTzhOgtE72j16LHqSBBkawqhADV40Pb7InS6ITCVN3RGF100tcRxDYKg');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

const getShoppingCartItems = async () => {

  let shoppingCart: ShoppingCartModel2[] = [];

  let response = await getTestCart2().then((cart) => {
    // shoppingCart = cart;
  })

  // if(response )

  return shoppingCart;
}

const stripeHandler = async ()=>{};
// const stripeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // const router = useRouter();

//   const { slug } = req.query;

//   console.log('req.query', req.query)
//   console.log('req.payment_id', slug)

//   let shoppingCart: ShoppingCartModel2[] = await getShoppingCartItems();

//   let lineItems: {
//     description: string,
//     price_data: {
//       currency: string,
//       product_data: {
//         name: string,
//       },
//       unit_amount: number,
//       tax_behavior: string,
//     },
//     // adjustable_quantity: {
//     //   enabled: true,
//     //   minimum: 1,
//     //   maximum: 10,
//     // },
//     quantity: number,
//     type: string

//   }[] = [];

  

//   // if (lineItems.length > 0) {
//     // console.log(lineItems)
//     const session = await stripe.checkout.sessions.create({
//       line_items: shoppingCart.map(
//         (cartItem: ShoppingCartModel2) => {
    
    
//           let lineItem: {
//             description: string,
//             price_data: {
//               currency: string,
//               product_data: {
//                 name: string,
//               },
//               unit_amount: number,
//               tax_behavior: string,
//             },
//             // adjustable_quantity: {
//             //   enabled: true,
//             //   minimum: 1,
//             //   maximum: 10,
//             // },
//             quantity: number,
//             type: string
    
    
//           } = {
//             description: cartItem.description,
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: cartItem.title
//               },
//               unit_amount: cartItem.price,
//               tax_behavior: 'exclusive'
    
//             },
//             quantity: 1,
//             type: "invoiceitem"
    
//           }
    
//           lineItems.push(lineItem);
    
//           // console.log("prev", shoppingCartItems);
//           console.log("new item", shoppingCart);
    
//           return lineItems;
    
    
//         }
//       )
//       // [
//       //   {
//       //     price_data: {
//       //       currency: 'usd',
//       //       product_data: {
//       //         name: 'T-shirt',
//       //       },
//       //       unit_amount: Number.parseInt(`${slug![0]}00`) ,
//       //       tax_behavior: 'exclusive',
//       //     },
//       //     // adjustable_quantity: {
//       //     //   enabled: true,
//       //     //   minimum: 1,
//       //     //   maximum: 10,
//       //     // },
//       //     quantity: 1,
//       //   },
//       // ]
//       ,
//       mode: 'payment',
//       success_url: `${YOUR_DOMAIN}?success=true`,
//       cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//     });

//     res.redirect(303, session.url);
//   // }

// }

app.listen(3000, () => console.log('Running on port 3000'));


export default stripeHandler;