import "@fontsource/jim-nightshade";
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import StripeCheckout from 'react-stripe-checkout'
const Home: NextPage = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="App">
      <header className="App-header">
        <Image src={'/myrrh_logo.png'} className="App-logo" alt="logo" layout="fill" objectFit='contain' />
      </header>
      <p>Hi, welcome to Myrrhaculous.com.<br/>You have come to the right place for all of your natural, organic health needs.</p>
      <div className="App-content">
        <h2>Jamie's All Natural Organic Tooth Powder</h2>
        <ul>
          <li>Not only is it anti-microbial, it also cleans and whitens teeth</li>
          <li>Myrrh has been used as a medicinal herb for thousands of years.  It is mentioned several times in the Bible, in the writings as old as Psalms and the Song of Solomon.  Of course it is well known as one of the three gifts that Magi brought to Jesus Christ.</li>
          <li>Ingredients: baking soda, myrrh, activated charcoal</li>
        </ul>
        <br/>
        <div className="checkout-details">
          Quantity: <select value={quantity} onChange={evt => setQuantity(Number(evt.target.value))}>
            {
              Array.from({length: 20}, (_, index) => index + 1).map(n => (
                <option value={n}>{n}</option>
              ))
            }
          </select><br/>
          Total Cost: ${quantity * 15} + shipping<br/>
        </div>
        
        <StripeCheckout
          lineItes
          bitcoin
          shippingAddress
          amount={quantity * 15 * 100}
          token={data => alert(`Thanks for your payment\n${JSON.stringify(data)}`)} 
          // label="BUY 😁"
          stripeKey="pk_test_51KcYEaG0RnPll7CdR07DRlWYy4V0hKFw7MAOotcOUpWkAVzHJwdXUWaPtDQcGH1TUu7tNXXOAYYkk35Ip5lAT6cg00owNpfIlZ">
          <button>BUY 😁</button>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default Home
