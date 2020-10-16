import Head from 'next/head';
import Header from './Header.js';
import Footer from './Footer.js';
import { useState } from 'react';
import { SumOfProducts } from '../util/types';

export default function Layout(props) {
  const [numOfProductsInCart, setNumOfProductsInCart] = useState(
    props.sumOfProductsCalculator,
  );
  //Type === number
  // console.log(numOfProductsInCart);
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header numOfProductsInCart={numOfProductsInCart} />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
