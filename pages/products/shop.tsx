import Layout from '../../components/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import { sumQuantityOfProducts } from '../../util/cookie.js';
import { Style } from '../../util/types';

const containerStyles: Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const allProductsContainer: Style = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignContent: 'center',
};
const productContainer: Style = {
  display: 'flex',
  flexDirection: 'column',
};

type Props = {
  props: {
    books: {
      id: number;
      firstName: string;
      lastName: string;
      title: string;
      productImage: string;
      price: string;
      alt: string;
    }[];
  };
  sumOfProducts: { id: number; count: number }[];
  allCookies: { books: { id: number; count: number }[] };
  bookCookies: { id: number; count: number }[];
};

export default function Shop(props: Props) {
  const sumOfProductsCalculator = sumQuantityOfProducts();

  const [bookFromCookie, setBookFromCookie] = useState(props.bookCookies);
  const [booksInCart, setBooksInCart] = useState(props.props.books);

  console.log(booksInCart);

  useEffect(() => {
    setBooksInCart(
      props.props.books.map((book) => {
        return {
          ...book,
          inCart: bookFromCookie,
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

  const props: {
    books: {
      id: number;
      firstName: string;
      lastName: string;
      title: string;
      productImage: string;
      price: string;
      alt: string;
    }[];
  } = { books };
  if (books) props.books = books;

  const allCookies = nextCookies(context);

  const numOfProductsAsStrings = Object.values(allCookies);

  const intNumOfProducts = numOfProductsAsStrings.map((string) =>
    parseInt(string),
  );

  function calcSumOfProducts(arrayOfValues: number[]): number {
    if (arrayOfValues.length > 0) {
      let total = arrayOfValues[0];
      for (let i = 1; i < arrayOfValues.length; i++) {
        total += arrayOfValues[i];
      }
      return total;
    } else {
      return 0;
    }
  }

  const sumOfProducts = calcSumOfProducts(intNumOfProducts);

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
