import "@fontsource/jim-nightshade";
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import React from "react";
const { default: LoadingOverlay } = require('react-loading-overlay');
 

const Home: NextPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const onBuy = useCallback(async evt => {
    setIsLoading(true);
    evt.preventDefault();
    const res = await fetch(
      '/api/create-checkout-session',
      {
        body: JSON.stringify({
          quantity,
          // testmode: true
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );
    try {
      const { redirect } = await res.json();
      console.log({ redirect });
      setIsLoading(false);  
      window.location = redirect;
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }, [quantity]);

  return (
    <div className="App">

      <Head>
        <title>Myrrhaculous.com</title>
      </Head>

      <LoadingOverlay
        active={isLoading}
        spinner
        text='Loading your order'
        >

        <header className="App-header">
          <Image src={'/PNG LOGO TRANSPARENT-02.png'} className="App-logo" alt="logo" layout="fill" objectFit='contain' />
        </header>
        <p>Hi, welcome to Myrrhaculous.com.<br/>You have come to the right place for all of your natural, organic health needs.</p>
        <div className="App-content">
          <h2>{`Jamie's All Natural Organic Tooth Powder`}</h2>
          <ul>
            <li>Not only is it anti-microbial, it also cleans and whitens teeth</li>
            <li>Myrrh has been used as a medicinal herb for thousands of years.  It is mentioned several times in the Bible, in the writings as old as Psalms and the Song of Solomon.  Of course it is well known as one of the three gifts that Magi brought to Jesus Christ.</li>
            <li>Ingredients: baking soda, myrrh, activated charcoal</li>
          </ul>
          <br/>

          <form onSubmit={onBuy}>

            <div className="checkout-details">
              Quantity: <select value={quantity} onChange={evt => setQuantity(Number(evt.target.value))}>
                {
                  Array.from({length: 20}, (_, index) => index + 1).map(n => (
                    <option key={`${n}option`} value={n}>{n}</option>
                  ))
                }
              </select><br/>
              Total Cost: ${quantity * 22} + free shipping<br/>
            </div>

            <button type="submit">BUY 😁</button>
            
          </form>
        </div>

      </LoadingOverlay>
      
    </div>
  );
}

export default Home
