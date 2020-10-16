import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import Cookie from 'js-cookie';
import { useState } from 'react';
import { sumQuantityOfProducts } from './../util/cookie';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonContainerStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  minWidth: '500px',
};

const addButtonStyles = {
  padding: '20px 30px',
  fontSize: '20px',
  backgroundColor: '#5963DE',
  color: '#fff',
  borderRadius: '15px',
};

export default function confirmAddToCart(props) {
  const sumOfProductsCalculator = sumQuantityOfProducts();
  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <div style={containerStyles}>
          <h1>Item Added to Your Cart</h1>
          <div style={buttonContainerStyles}>
            <button style={addButtonStyles}>
              <Link href="/products/shop">
                <a>Return to Shop</a>
              </Link>
            </button>
            <button style={addButtonStyles}>
              <Link href="/cart">
                <a>Go To Cart</a>
              </Link>
            </button>
            <button style={addButtonStyles}>
              <Link href="/products/shop">
                <a>Proceed To Checkout</a>
              </Link>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // const id = Cookie.get()
  // const { getBookById } = await import('../util/database');
  // const books = await getBookById(id);

  // const props = {};
  // if (books) props.books = books[0];

  const allCookies = nextCookies(context);
  const productInCart = allCookies.productInCart || [];

  const numOfProducts = Object.values(allCookies);
  const reducer = (accumulator, currentValue) =>
    parseInt(accumulator) + parseInt(currentValue);
  function calcSumOfProducts() {
    if (numOfProducts.length > 0) {
      return numOfProducts.reduce(reducer);
    } else {
      return 0;
    }
  }

  const sumOfProducts = calcSumOfProducts();

  return {
    props: { sumOfProducts },
  };
}
