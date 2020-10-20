import Head from 'next/head';
import Link from 'next/link';
import { Style } from '../util/types';

const headerStyles: Style = {
  margin: '0 10%',
};

const headerContainerStyles: Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  marginTop: '10px',
};

const navContainerStyles: Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignContent: 'center',
  maxWidth: '600px',
};

const navStyles: Style = {
  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'center',
  // alignContent: 'space-around',
  // maxWidth: '200px',
  fontSize: '24px',
  fontWeight: '300',
  marginLeft: '20px',
};

const shoppingCartStyles: Style = {
  display: 'flex',
  flexDirection: 'column',
};

const cartStyles: Style = {
  margin: '-5px 0 0 20px',
};

const numStyles: Style = {
  marginLeft: '30px',
};

export default function Header(props) {
  const cartValue = props.numOfProductsInCart;
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
            <Link href="/products/shop">
              <a style={navStyles} data-cy="go-to-shop">
                Shop
              </a>
            </Link>
            <Link href="/contact">
              <a style={navStyles}>Contact</a>
            </Link>
            <div style={shoppingCartStyles}>
              <Link href="/cart">
                <a data-cy="go-to-cart">
                  <div data-cy="header-cart-value" style={numStyles}>
                    {cartValue}
                  </div>
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
