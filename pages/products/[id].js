import Layout from '../../components/Layout';
import AddToCart from '../../components/AddToCart';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import { centsToDollars } from '../../util/helper';

const allProductsContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignContent: 'center',
};
const productContainer = {
  display: 'flex',
  flexDirection: 'column',
};

export default function id(props) {
  const sumOfProductsCalculator = props.sumProducts;

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

  const [bookFromCookie, setBookFromCookie] = useState(props.bookCookies);
  const [booksInCart, setBooksInCart] = useState([]);

  const id = props.id;
  const [cookieCount, setCookieCount] = useState(sumOfProductsCalculator);
  console.log(cookieCount);

  useEffect(() => {
    setBooksInCart(props.makeCookieForBrowser);
    setCookieCount(booksInCart[0]?.count);
  }, [props.books, bookFromCookie, setBooksInCart, props.makeCookieForBrowser]);

  if (!props.books) {
    return (
      <>
        <Head>
          <title>User not found</title>
        </Head>
        <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
          <div>User not found.</div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <h1>
          {title} - {firstName} {lastName}
        </h1>
        <div style={allProductsContainer}>
          <div style={productContainer}>
            <a>
              <img
                data-cy="product-image"
                src={productImage}
                alt={altTag}
              ></img>
            </a>
            <p>
              {firstName} {lastName}
            </p>
            <p>{title}</p>
            <p>Price: {centsToDollars(price)}</p>
          </div>

          <AddToCart id={id} cookieCount={cookieCount}></AddToCart>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBooks } = await import('../../util/database');
  const { makeCookie, sumQuantityOfProducts } = await import(
    '../../util/cookie'
  );

  const books = await getBooks();

  const allCookies = nextCookies(context);

  const bookId = parseInt(context.query.id);
  const bookInCart = allCookies.book || [];

  const makeCookieForBrowser = makeCookie(bookId);
  const sumProducts = sumQuantityOfProducts();

  return {
    props: {
      books,
      allCookies,
      bookCookies: bookInCart,
      id: bookId,
      makeCookieForBrowser,
      sumProducts,
    },
  };
}
