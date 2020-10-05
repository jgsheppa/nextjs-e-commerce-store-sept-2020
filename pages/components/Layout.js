import Head from 'next/head';
import Header from './Header.js';
import Footer from './Footer.js';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import { useState } from 'react';

export default function Layout(props) {
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const wholeCart = [...cart];
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header itemCount={itemCount} />
      <main cart={cart}>{props.children}</main>
      <Footer />
    </>
  );
}
