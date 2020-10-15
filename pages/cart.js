import Link from 'next/link';
import Layout from './components/Layout';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { sumQuantityOfProducts, getCartFromCookies } from './../util/cookie';

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginLeft: '20px',
};

const itemBorder = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  border: 'solid',
  borderColor: '#000',
  borderRadius: '20px',
};

const itemInfoStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  maxWidth: '1000px',
  maxHeight: '150px',
  minHeight: '150px',
  minWidth: '400px',
  width: '500px',
  padding: '30px 20px',
};

const quatityStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  marginBottom: '10px',
};

const removeItemStyles = {
  padding: '10px 20px',
  backgroundColor: '#5963DE',
  color: '#fff',
  borderRadius: '15px',
};

const buttonBorderStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  border: 'solid',
  borderRadius: '15px',
  borderColor: '#000',
  maxHeight: '400px',
  maxWidth: '200px',
  padding: '80px 80px 80px',
  marginRight: '30px',
};

const purchaseButtonStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '30px 50px',
  borderRadius: '15px',
  backgroundColor: '#DE5963',
  color: '#fff',
};

const imageStyles = {
  padding: '20px',
  maxHeight: '300px',
  maxWidth: 'auto',
};

const productInfoStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'space-evenly',
  justifyContent: 'center',
};

const productDetailStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  marginBottom: '20px',
  lineHeight: '2',
};

export default function Cart(props) {
  const sumOfProductsCalculator = sumQuantityOfProducts();

  const [allProducts, setAllProducts] = useState(props.props.books);

  const cookieCart = getCartFromCookies();
  const cartQuantities = cookieCart.map((item) => {
    if (item.count > 0) {
      return item.count;
    }
    item;
  });

  const cartProducts = cookieCart.map((item) => {
    if (item.count > 0) {
      return item.id;
    }
    item;
  });

  const [items, setItems] = useState(cartProducts);

  const [bag, setBag] = useState(putItemsInCart(items));
  const allItemsInCart = [...bag];
  console.log(typeof cartProducts[0]);

  function putItemsInCart(cartItems) {
    const itemArray = [];
    for (let i = 0; i < allProducts.length; i++) {
      if (items.includes(allProducts[i].id)) {
        itemArray.push(allProducts[i]);
      }
    }
    return itemArray;
  }

  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <h1>Your Cart</h1>
        <div style={containerStyles}>
          {bag.map((book) => (
            <div key={book.id} style={itemBorder}>
              <div style={productInfoStyles}>
                <img style={imageStyles} src={book.productImage} />
                <div style={productDetailStyles}>
                  <div>
                    <b>
                      {book.firstName} {book.lastName}
                    </b>
                  </div>
                  <div>
                    <i>{book.title}</i>
                  </div>
                  <div>{book.price}</div>
                </div>
              </div>
              <div style={itemInfoStyles}>
                <div style={quatityStyles}>
                  <div>Quantity: </div>
                  <select>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div>
                  <button style={removeItemStyles}>Remove Item</button>
                </div>
              </div>
            </div>
          ))}

          <div style={buttonBorderStyles}>
            <button style={purchaseButtonStyles}>
              <a>Purchase</a>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBooks } = await import('../util/database');
  const { getCartFromCookies, toggleItemsInCartInCookie } = await import(
    '../util/cookie'
  );

  console.log(`My cookies: ${getCartFromCookies()}`);

  const books = await getBooks();
  const props = {};
  if (books) props.books = books;

  console.log(toggleItemsInCartInCookie(props.books.id));

  const allCookies = nextCookies(context);

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

  const cookieKeys = Object.keys(allCookies);
  const cookieKeysToInt = cookieKeys.map((value) => parseInt(value));
  // console.log(cookieKeys);
  // console.log(cookieKeysToInt);

  const sumOfProducts = calcSumOfProducts();
  return {
    props: { props, sumOfProducts, allCookies, cookieKeysToInt },
  };
}
