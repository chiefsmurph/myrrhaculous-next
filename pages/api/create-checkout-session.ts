import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  redirect: string
}

const HOST = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : 'https://myrrhaculous.com';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {

    const getEnvParam = (base: string) => 
      process.env[`${base}_${req.body.testmode ? 'TEST' : 'PROD'}`];

    const stripeKey = getEnvParam('STRIPE_SECRET');
    // console.log('stripeKey', stripeKey)
    const stripe = require('stripe')(stripeKey);
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            // # Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            }
          }
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Next day air',
            // # Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            }
          }
        },
      ],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product: getEnvParam('STRIPE_PRODUCT_ID'),
            unit_amount: 2200,
          },
          quantity: req.body.quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
        },
      ],
      mode: 'payment',
      success_url: `${HOST}/success`,
      cancel_url: `${HOST}/`,
    });
  
    res.status(200).json({ redirect: session.url });
  }
  // res.status(200).json({ name: 'John Doe' })
}
