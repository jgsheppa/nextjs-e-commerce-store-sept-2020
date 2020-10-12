import Head from 'next/head';
import Header from './Header.js';
import Footer from './Footer.js';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import { useState } from 'react';

export default function Layout(props) {
  const [numOfProductsInCart, setNumOfProductsInCart] = useState(
    props.numOfProductsInCart,
  );
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
