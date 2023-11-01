import { NextApiRequest, NextApiResponse } from "next";



// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Nzfu3Ik0Fd7YGJ9QAwrjQC6yefPOOkLEySARmorKmKTzhOgtE72j16LHqSBBkawqhADV40Pb7InS6ITCVN3RGF100tcRxDYKg');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { amount, payment_intent_id, description} = req.body;
    if (payment_intent_id) {
      try {
        // If a payment_intent_id is passed, retrieve the paymentIntent
        const current_intent = await stripe.paymentIntents.retrieve(
          payment_intent_id
        );
        // If a paymentIntent is retrieved update its amountz
        if (current_intent) {
          const updated_intent = await stripe.paymentIntents.update(
            payment_intent_id,
            {
              amount: amount,
            }
          );
          res.status(200).json(updated_intent);
          return;
        }
      } catch (e: any) {
        //Catch any error and return a status 500
        if (e.code !== 'resource_missing') {
          const errorMessage =
            e instanceof Error ? e.message : 'Internal server error';
          res.status(500).json({ statusCode: 500, message: errorMessage });
          return;
        }
      }
    }
    try {
      // Create PaymentIntent
      const params = {
        amount: amount,
        currency: 'usd',
        description: description,
        automatic_payment_methods: {
          enabled: true,
        },
      };
      const payment_intent = await stripe.paymentIntents.create(params);
      //Return the payment_intent object
      res.status(200).json(payment_intent);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  };

app.listen(4242, () => console.log('Running on port 4242'));


export default handler;