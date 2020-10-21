import Layout from '../../components/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import { sumQuantityOfProducts } from '../../util/cookie.js';
import { Style } from '../../util/types';
import { centsToDollars } from '../../util/helper';

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
  sumProducts: number;
  allCookies: { books: { id: number; count: number }[] };
  bookCookies: { id: number; count: number }[];
};

export default function Shop(props: Props) {
  const [sumOfProductsCalculator, setSumOfProductsCalculator] = useState(
    props.sumProducts,
  );

  const [bookFromCookie, setBookFromCookie] = useState(props.bookCookies);
  const [booksInCart, setBooksInCart] = useState(props.props.books);

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
                  <p>Price: {centsToDollars(book.price)}</p>
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
  const { getBooks } = await import('../../util/database');
  const { sumQuantityOfProducts } = await import('../../util/cookie');

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

  const allCookies = nextCookies(context);

  const bookInCart = allCookies.book || [];

  const sumProducts = sumQuantityOfProducts();
  console.log(sumProducts);

  return {
    props: {
      props,
      allCookies,
      bookCookies: bookInCart,
      sumProducts,
    },
  };
}
