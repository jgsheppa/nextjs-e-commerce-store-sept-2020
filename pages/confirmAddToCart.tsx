import Link from 'next/link';
import Layout from '../components/Layout';
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
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '800px',
};

const addButtonStyles: Style = {
  padding: '20px 30px',
  fontSize: '20px',
  backgroundColor: '#5963DE',
  color: '#fff',
  borderRadius: '15px',
};

export default function confirmAddToCart() {
  return (
    <>
      <Layout>
        <div style={containerStyles}>
          <h1
            style={{
              borderTop: 'double',
              padding: '36px 0',
              borderWidth: '3px',
              margin: '36px 0 20px',
            }}
          >
            Item Added to Your Cart
          </h1>
          <div style={buttonContainerStyles}>
            <div>
              <button style={addButtonStyles}>
                <Link href="/products/shop">
                  <a data-cy="back-to-shop">Return to Shop</a>
                </Link>
              </button>
            </div>
            <div>
              <button style={addButtonStyles}>
                <Link href="/cart">
                  <a>Go To Cart</a>
                </Link>
              </button>
            </div>
            <div>
              <button style={addButtonStyles}>
                <Link href="/checkout">
                  <a data-cy="go-to-checkout">Proceed To Checkout</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
