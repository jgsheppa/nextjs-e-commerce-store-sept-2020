import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { sumQuantityOfProducts } from '../util/cookie.js';
import { Style } from '../util/types';

const containerStyles: Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonContainerStyles: Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  minWidth: '500px',
};

const addButtonStyles: Style = {
  padding: '20px 30px',
  fontSize: '20px',
  backgroundColor: '#5963DE',
  color: '#fff',
  borderRadius: '15px',
};

export default function confirmAddToCart() {
  const sumOfProductsCalculator = sumQuantityOfProducts();
  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <div style={containerStyles}>
          <h1>Item Added to Your Cart</h1>
          <div style={buttonContainerStyles}>
            <button style={addButtonStyles}>
              <Link href="/products/shop">
                <a data-cy="back-to-shop">Return to Shop</a>
              </Link>
            </button>
            <button style={addButtonStyles}>
              <Link href="/cart">
                <a>Go To Cart</a>
              </Link>
            </button>
            <button style={addButtonStyles}>
              <Link href="/checkout">
                <a data-cy="go-to-checkout">Proceed To Checkout</a>
              </Link>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
