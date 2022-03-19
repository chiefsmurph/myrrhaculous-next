import "@fontsource/jim-nightshade";
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import React from "react"
import Confetti from 'react-confetti'
const { default: ReactTypingEffect } = require('react-typing-effect');

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{ 
    width: number | undefined,
    height: number | undefined 
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
  
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function useHeaderHeight() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      const appHeaderEl = document.querySelector('.App-header');
      appHeaderEl && setHeaderHeight(
        appHeaderEl.getBoundingClientRect().height
      );
    }
  
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
  
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return headerHeight;
}

const Home: NextPage = () => {
  const { width, height} = useWindowSize();
  const headerHeight = useHeaderHeight();
  console.log({ width, height, headerHeight });
  return (
    <div className="App">

      <Head>
        <title>Thank you for your purchase!</title>
      </Head>
      {
        width && height && (
        <Confetti
          width={width}
          height={headerHeight}
          />
        )
      }
      <header className="App-header">
        <Image src={'/PNG LOGO TRANSPARENT-02.png'} className="App-logo" alt="logo" layout="fill" objectFit='contain' />
      </header>
      <div className="App-content">
        <h1 style={{ lineHeight: 1.5, fontSize: '200%' }}>
          <ReactTypingEffect
            speed={100}
            typingDelay={0}
            eraseDelay={100000000}
            text={"Thank you for your purchase!  YOU ARE AWESOME!"}
          />
            
          </h1>
        <h2>
          <ReactTypingEffect
              typingDelay={6000}
              text={"Jamie"}
              eraseDelay={100000000}
              cursorRenderer={(cursor: string) => <h1>{cursor}</h1>}
              displayTextRenderer={(text: string, i: number) => {
                return (
                  <h1>
                  {text.split('').map((char, i) => {
                    const key = `${i}`;
                    return (
                    <span
                        key={key}
                        style={i%2 === 0 ? { color: 'magenta'} : {}}
                    >{char}</span>
                    );
                  })}
                  </h1>
                );
              }}
          />
        </h2>
      </div>

    </div>
  );
}

export default Home
