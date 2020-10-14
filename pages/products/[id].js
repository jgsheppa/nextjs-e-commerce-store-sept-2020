import Layout from '../components/Layout.js';
import AddToCart from '../components/AddToCart.js';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import Cookie from 'js-cookie';
import { parseCookies } from '../../util/cookie.js';
import cookies from 'next-cookies';

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
  const [numOfProductsInCart, setNumOfProductsInCart] = useState(
    props.sumOfProducts,
  );

  const [id, setID] = useState(props.props.books?.id);
  const [firstName, setFirstName] = useState(props.props.books?.firstName);
  const [lastName, setLastName] = useState(props.props.books?.lastName);
  const [title, setTitle] = useState(props.props.books?.title);
  const [price, setPrice] = useState(props.props.books?.price);
  const [productImage, setProductImage] = useState(
    props.props.books?.productImage,
  );
  const [altTag, setAltTag] = useState(props.books?.alt);

  const cookie = props.getCookies[id];

  const [listOfItems, setListOfItems] = useState(cookie || []);
  // console.log(listOfItems);
  const wholeListOfItems = [...listOfItems, { id }];
  // console.log(wholeListOfItems);
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   Cookie.set(id, count);
  // }, []);

  if (!props.props.books) {
    return (
      <>
        <Head>
          <title>User not found</title>
        </Head>
        <Layout numOfProductsInCart={numOfProductsInCart}>
          <div>User not found.</div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout numOfProductsInCart={numOfProductsInCart}>
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
          <AddToCart
            handleChange={() => {
              Cookie.set(id, 1);
            }}
          ></AddToCart>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  const { getBookById } = await import('../../util/database');
  const books = await getBookById(id);

  const props = {};
  if (books) props.books = books[0];

  const allCookies = nextCookies(context);

  const productInCart = allCookies.productInCart || [];

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

  const bookID = JSON.stringify(books[0].id);

  const getCookies = parseCookies(context.req);
  console.log(getCookies[bookID]);

  return {
    props: { props, sumOfProducts, allCookies, getCookies },
  };
}
