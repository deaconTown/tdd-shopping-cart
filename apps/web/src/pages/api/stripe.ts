import { NextApiRequest, NextApiResponse } from "next";
// import { useRouter } from "next/router";


// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Nzfu3Ik0Fd7YGJ9QAwrjQC6yefPOOkLEySARmorKmKTzhOgtE72j16LHqSBBkawqhADV40Pb7InS6ITCVN3RGF100tcRxDYKg');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:3000';
const YOUR_DOMAIN = `${process.env.NEXT_PUBLIC_DOMAINBASEURL}`;
// const router = useRouter();


const stripeHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    console.warn("respone body", req.body);

    let resBody = req.body;

    res.setHeader('Access-Control-Allow-Credentials', 'true');

    const session = await stripe.checkout.sessions.create({
      line_items: resBody
      // [
      //   {
      //     price_data: {
      //       currency: 'usd',
      //       product_data: {
      //         name: 'T-shirt',
      //       },
      //       unit_amount: 2000,
      //       tax_behavior: 'exclusive',
      //     },
      //     // adjustable_quantity: {
      //     //   enabled: true,
      //     //   minimum: 1,
      //     //   maximum: 10,
      //     // },
      //     quantity: 1,
      //   },
      // ]
      ,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ session: session })
    // res.redirect(303, session.url);
    // res.redirect(303, YOUR_DOMAIN);
  }
  else {
    res.status(405).json
  }


}

// app.listen(3000, () => console.log('Running on port 3000'));


export default stripeHandler;