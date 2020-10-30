import Head from 'next/head';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import Layout from '../../components/Layout';
import AddToCart from '../../components/AddToCart';
import { centsToDollars } from '../../util/helper';
import { sumQuantityOfProducts, getCartFromCookies } from '../../util/cookie';

const allProductsContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignContent: 'center',
  marginBottom: '100px',
};

const productContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'center',
  minWidth: '400px',
  width: '800px',
};

export default function id(props) {
  if (props.id > props.books[props.books.length - 1].id) {
    return (
      <>
        <Head>
          <title>Item not found</title>
        </Head>
        <Layout>
          <h1
            style={{
              padding: '36px 0',
              margin: '36px 0 60px',
            }}
          >
            Item not found.
          </h1>
        </Layout>
      </>
    );
  }

  const sumOfProductsCalculator = sumQuantityOfProducts();
  console.log(props);

  const [bookID, setBookID] = useState(parseInt(props.id));

  function findBookInfo() {
    for (let i = 0; i < props.books.length; i++) {
      if (props.books[i].id === bookID) {
        return props.books[i];
      }
    }
  }

  const bookInfo = findBookInfo();

  const [firstName, setFirstName] = useState(bookInfo.firstName);
  const [lastName, setLastName] = useState(bookInfo.lastName);
  const [title, setTitle] = useState(bookInfo.title);
  const [price, setPrice] = useState(bookInfo.price);
  const [productImage, setProductImage] = useState(bookInfo.productImage);
  const [altTag, setAltTag] = useState(bookInfo.alt);

  const [booksInCart, setBooksInCart] = useState([]);

  const [cookieCount, setCookieCount] = useState(sumOfProductsCalculator);

  const convertedPrice = centsToDollars(price);

  useEffect(() => {
    setBooksInCart(getCartFromCookies());
    setCookieCount(props.productCount);
  }, []);

  return (
    <>
      <Layout>
        <h1
          style={{
            borderBottom: 'double',
            borderTop: 'double',
            padding: '36px 0',
            borderWidth: '3px',
            margin: '36px 0 60px',
          }}
        >
          {title} - {firstName} {lastName}
        </h1>
        <div style={allProductsContainer}>
          <div style={productContainer}>
            <div>
              <a>
                <img
                  data-cy="product-image"
                  src={productImage}
                  alt={altTag}
                ></img>
              </a>
              <p>
                <i>
                  {firstName} {lastName}
                </i>
              </p>
              <p>
                <b>{title}</b>
              </p>
              <p>Price: {convertedPrice}</p>
            </div>
            <div>
              <AddToCart
                convertedPrice={convertedPrice}
                bookID={bookID}
                cookieCount={cookieCount}
              ></AddToCart>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBooks } = await import('../../util/database');

  const books = await getBooks();

  const allCookies = nextCookies(context);

  const bookId = parseInt(context.query.id);

  return {
    props: {
      books,
      allCookies,
      id: bookId,
    },
  };
}
