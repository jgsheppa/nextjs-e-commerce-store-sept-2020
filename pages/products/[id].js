import Layout from '../../components/Layout';
import AddToCart from '../../components/AddToCart';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import { makeCookie, sumQuantityOfProducts } from '../../util/cookie';

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
  const sumOfProductsCalculator = sumQuantityOfProducts();
  const [numOfProductsInCart, setNumOfProductsInCart] = useState(
    props.sumOfProducts,
  );

  const [bookID, setBookID] = useState(parseInt(props.id));

  function findBookInfo() {
    for (let i = 0; i < props.books.length; i++) {
      if (props.books[i].id === bookID) {
        return props.books[i];
      }
    }
  }

  const bookInfo = findBookInfo();
  console.log(bookInfo);
  console.log(props.bookInCart);

  const [firstName, setFirstName] = useState(bookInfo.firstName);
  const [lastName, setLastName] = useState(bookInfo.lastName);
  const [title, setTitle] = useState(bookInfo.title);
  const [price, setPrice] = useState(bookInfo.price);
  const [productImage, setProductImage] = useState(bookInfo.productImage);
  const [altTag, setAltTag] = useState(bookInfo.alt);

  const [bookFromCookie, setBookFromCookie] = useState(props.bookCookies);
  const [booksInCart, setBooksInCart] = useState([]);

  const [productCount, setProductCount] = useState(0);

  const id = props.id;
  const [cookieCount, setCookieCount] = useState(0);
  console.log(cookieCount);

  useEffect(() => {
    setBooksInCart(makeCookie(bookID));
    setCookieCount(booksInCart[0]?.count);
    // setBooksInCart(
    //   props.props.books.map((book) => {
    //     return {
    //       ...book,
    //       inCart: bookFromCookie.includes(book.id),
    //     };
    //   }),
    // );
  }, [props.books, bookFromCookie, setBooksInCart, makeCookie]);

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
              <img src={productImage} alt={altTag}></img>
            </a>
            <p>
              {firstName} {lastName}
            </p>
            <p>{title}</p>
            <p>Price: {price}</p>
          </div>
          <AddToCart id={id} cookieCount={cookieCount}></AddToCart>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBookById, getBooks } = await import('../../util/database');

  const books = await getBooks();
  const bookByID = await getBookById();

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

  const sumOfProducts = calcSumOfProducts();

  const bookId = parseInt(context.query.id);
  const bookInCart = allCookies.book || [];
  console.log(bookInCart);

  return {
    props: {
      books,
      sumOfProducts,
      allCookies,
      bookCookies: bookInCart,
      id: bookId,
    },
  };
}
