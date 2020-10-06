import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const headerStyles = {
  margin: '0 10%',
};

const headerContainerStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  marginTop: '10px',
};

const navContainerStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignContent: 'center',
  maxWidth: '600px',
};

const navStyles = {
  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'center',
  // alignContent: 'space-around',
  // maxWidth: '200px',
  fontSize: '24px',
  fontWeight: '300',
  marginLeft: '20px',
};

const shoppingCartStyles = {
  display: 'flex',
  flexDirection: 'column',
};

const cartStyles = {
  margin: '-5px 0 0 20px',
};

const numStyles = {
  marginLeft: '30px',
};
export default function Header() {
  // const [itemCount, setItemCount] = useState(0);
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={headerStyles}>
        <div style={headerContainerStyles}>
          <a href="/">
            <img
              style={{ maxHeight: '100px', maxWidth: 'auto' }}
              src="/booknook_logo.png"
              alt="book nook logo"
            />
          </a>

          <div style={navContainerStyles}>
            <Link href="/nav/shop">
              <a style={navStyles}>Shop</a>
            </Link>
            <Link href="/nav/contact">
              <a style={navStyles}>Contact</a>
            </Link>
            <div style={shoppingCartStyles}>
              <Link href="/checkout/cart">
                <a>
                  <div style={numStyles}>0</div>
                  <img
                    style={cartStyles}
                    alt="Shopping Cart"
                    src="/shopping_cart.png"
                    height="25px"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
