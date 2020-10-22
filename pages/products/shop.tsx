import Layout from '../../components/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  sumQuantityOfProducts,
  getCartFromCookies,
} from '../../util/cookie.js';
import { Style } from '../../util/types';
import { centsToDollars } from '../../util/helper';

const containerStyles: Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '30px 0',
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
  flex: '1',
  margin: '0 40px 100px',
  maxWidth: '800px',
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
};

export default function Shop(props: Props) {
  const [sumOfProductsCalculator, setSumOfProductsCalculator] = useState(
    sumQuantityOfProducts(),
  );

  const [bookFromCookie, setBookFromCookie] = useState(getCartFromCookies());
  const [booksInCart, setBooksInCart] = useState(props.props.books);
  console.log('bookFromCookie', bookFromCookie);

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
        <div data-cy="product-list" style={allProductsContainer}>
          {props.props.books.map((book) => {
            return (
              <div style={productContainer} key={book.id}>
                <Link href={`/products/${book.id}`}>
                  <a data-cy={`products${book.id}`}>
                    <img
                      height="auto"
                      width="200px"
                      src={book.productImage}
                      alt={book.alt}
                    ></img>
                  </a>
                </Link>
                <p>
                  <b>
                    {book.firstName} {book.lastName}
                  </b>
                </p>
                <p>
                  <i>{book.title}</i>
                </p>
                <p>Price: {centsToDollars(book.price)}</p>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBooks } = await import('../../util/database');

  const books = await getBooks();

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

  return {
    props: {
      props,
    },
  };
}
