import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { sumQuantityOfProducts, getCartFromCookies } from './../util/cookie';
import { centsToDollars } from './../util/helper';

const pageContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '100px',
};
const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
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
  maxWidth: '800px',
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
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  border: 'solid',
  borderRadius: '15px',
  borderColor: '#000',
  // maxHeight: '400px',
  // maxWidth: '200px',
  padding: '40px',
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
  // const [deleteProduct, setDeleteProduct] = useState(cookieCart);
  console.log(allProducts);

  const cookieCart = getCartFromCookies();

  const cookieProductIds = cookieCart.map((item) => {
    if (item.count > 0) {
      return item.id;
    }
    item;
  });

  const bookInfoIds = allProducts.map((item) => item.id);

  function addQtyToBookInfo(bookInfo, cookieIds, bookIds, cookies) {
    const newBookInfo = [...bookInfo];
    // const newBookInfo = [];
    for (let i = 0; i < bookInfo.length; i++) {
      if (cookieIds.includes(bookIds[i])) {
        newBookInfo[i].count = cookies[i].count;
      }
    }
    return newBookInfo;
  }

  const bookInfoWithQty = addQtyToBookInfo(
    allProducts,
    cookieProductIds,
    bookInfoIds,
    cookieCart,
  );

  function putItemsInCart(cartItems, idNums) {
    const itemArray = [];
    for (let i = 0; i < allProducts.length; i++) {
      if (idNums.includes(cartItems[i].id)) {
        itemArray.push(cartItems[i]);
      }
    }
    return itemArray;
  }

  const cart = putItemsInCart(bookInfoWithQty, cookieProductIds);

  const [cartState, setCartState] = useState(cart);

  function findSubtotal(products, cookieObjs) {
    let total = 0;
    for (let i = 0; i < cookieObjs.length; i++) {
      for (let j = 0; j < cookieObjs.length; j++) {
        if (products[i].id === cookieObjs[j].id) {
          total += products[i].price * cookieObjs[j].count;
        }
      }
    }
    return total;
  }

  const subTotal = findSubtotal(allProducts, cookieCart);

  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <h1>Checkout</h1>
        <div style={pageContainer}>
          <div style={containerStyles}>
            <h2>Shipping Address</h2>
            <h2>Paymend Method</h2>
            <h2>Review Items and Shipping</h2>
            {cartState.map((book) => (
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
                    <div>{centsToDollars(book.price)}</div>
                  </div>
                </div>
                <div style={itemInfoStyles}>
                  <div style={quatityStyles}>
                    <div>Quantity: </div>
                    <select>
                      <option>{book.count}</option>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5+</option>
                    </select>
                  </div>
                  <div>
                    <button style={removeItemStyles}>Remove Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={buttonBorderStyles}>
              <Link href="/thankYouPage">
                <a style={purchaseButtonStyles}>Place Your Order</a>
              </Link>
              <div>
                <b>Subtotal:</b>
                <div>{centsToDollars(subTotal)}</div>
              </div>
            </div>
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
