import Layout from '../../components/Layout';
import AddToCart from '../../components/AddToCart';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
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
  justifyContent: 'center',
  alignContent: 'space-between',
};

export default function id(props) {
  // const sumOfProductsCalculator = props.sumProducts;
  const sumOfProductsCalculator = sumQuantityOfProducts();

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

  // const [bookFromCookie, setBookFromCookie] = useState(props.bookCookies);
  const [booksInCart, setBooksInCart] = useState([]);
  console.log(booksInCart);

  const id = props.id;
  const [cookieCount, setCookieCount] = useState(sumOfProductsCalculator);

  const convertedPrice = centsToDollars(price);
  console.log('price', convertedPrice);

  useEffect(() => {
    setBooksInCart(getCartFromCookies());
    setCookieCount(props.productCount);
  }, []);

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
            <div>
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
              <p>Price: {convertedPrice}</p>
            </div>
            <div>
              <AddToCart
                convertedPrice={convertedPrice}
                id={id}
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
  const { sumQuantityOfProducts } = await import('../../util/cookie');

  const books = await getBooks();
  // console.log('books', books);

  const allCookies = nextCookies(context);
  // console.log('allCookies', allCookies);

  const bookId = parseInt(context.query.id);
  const bookInCart = allCookies.book || [];

  const sumProducts = sumQuantityOfProducts();

  function getServerCount(cookie, id) {
    if (cookie.id === id) {
      return cookie.count;
    } else {
      return 0;
    }
  }

  const serverProductCount = allCookies?.book?.filter((cookie) => {
    if (cookie.id && cookie.id === bookId) {
      return cookie.count;
    } else {
      return [];
    }
  });

  // const productCount = serverProductCount;
  console.log(serverProductCount);

  return {
    props: {
      books,
      allCookies,
      bookCookies: bookInCart,
      id: bookId,
      sumProducts,
    },
  };
}
