import Layout from '../../components/Layout.js';
// import { products } from '../../util/database';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import Cookie from 'js-cookie';
import { sumQuantityOfProducts } from '../../util/cookie';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const allProductsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignContent: 'center',
};
const productContainer = {
  display: 'flex',
  flexDirection: 'column',
};

export default function Shop(props) {
  const sumOfProductsCalculator = sumQuantityOfProducts();

  const [bookFromCookie, setBookFromCookie] = useState(props.bookCookies);
  const [booksInCart, setBooksInCart] = useState(props.props.books);

  useEffect(() => {
    setBooksInCart(
      props.props.books.map((book) => {
        return {
          ...book,
          inCart: bookFromCookie.includes(book.id),
        };
      }),
    );
  }, [props.props.books, bookFromCookie, setBooksInCart]);

  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <div style={containerStyles}>
          <h1>The Nook</h1>
        </div>
        <div style={allProductsContainer}>
          {props.props.books.map((book) => {
            return (
              <div style={productContainer} key={book.id}>
                <Link href={`/products/${book.id}`}>
                  <a>
                    <img src={book.productImage} alt={book.alt}></img>
                  </a>
                </Link>
                <div>
                  <p>
                    <b>
                      {book.firstName} {book.lastName}
                    </b>
                  </p>
                  <p>
                    <i>{book.title}</i>
                  </p>
                  <p>Price: {book.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

// export async function getServerSideProps() {
//   const { getBooks } = await import('../../util/database');
//   const books = await getBooks();

//   const props = {};
//   if (books) props.books = books;

//   return {
//     props: props,
//   };
// }

// export async function getServerSideProps(context) {
//   const { getBooks } = await import('../../util/database');
//   const books = await getBooks();

//   const props = {};
//   if (books) props.books = books;

//   const allCookies = nextCookies(context);
//   const productInCart = allCookies.productInCart || [];

//   const numOfProducts = Object.values(allCookies);
//   const reducer = (accumulator, currentValue) =>
//     parseInt(accumulator) + parseInt(currentValue);
//   function calcSumOfProducts() {
//     if (numOfProducts.length > 0) {
//       return numOfProducts.reduce(reducer);
//     } else {
//       return 0;
//     }
//   }

//   const sumOfProducts = calcSumOfProducts();

//   return {
//     props: { props, sumOfProducts },
//   };
// }

export async function getServerSideProps(context) {
  const id = context.query.id;
  const { getBookById, getBooks } = await import('../../util/database');
  const { getCartFromCookies, toggleItemsInCartInCookie } = await import(
    '../../util/cookie'
  );

  // console.log(getCartFromCookies());

  // console.log(`My cookies: ${getCartFromCookies()}`);

  const books = await getBooks();
  const bookByID = await getBookById();

  const props = {};
  if (books) props.books = books;
  // console.log(props.books);

  // console.log(toggleItemsInCartInCookie(props.books.id));

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

  const bookInCart = allCookies.book || [];
  // console.log(bookInCart);

  // console.log(props.books);
  return {
    props: {
      props,
      sumOfProducts,
      allCookies,
      bookCookies: bookInCart,
    },
  };
}
