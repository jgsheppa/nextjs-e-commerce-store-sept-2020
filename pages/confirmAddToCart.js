import Link from 'next/link';
import Layout from './components/Layout';

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

export default function confirmAddToCart() {
  return (
    <>
      <Layout>
        <div style={containerStyles}>
          <h1>Item Added to Your Cart</h1>
          <div style={buttonContainerStyles}>
            <button style={addButtonStyles}>
              <Link href="/nav/shop">
                <a>Return to Shop</a>
              </Link>
            </button>
            <button style={addButtonStyles}>
              <Link href="/checkout/cart">
                <a>Checkout</a>
              </Link>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
