import Layout from '../components/Layout.js';
import AddToCart from '../components/AddToCart.js';
import Head from 'next/head';
import { useState } from 'react';
import camelcaseKeys from 'camelcase-keys';

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
export default function product(props) {
  const [id, setID] = useState(props.books?.id);
  const [firstName, setFirstName] = useState(props.books?.firstName);
  const [lastName, setLastName] = useState(props.books?.lastName);
  const [title, setTitle] = useState(props.books?.title);
  const [price, setPrice] = useState(props.books?.price);
  const [productImage, setProductImage] = useState(props.books?.productImage);
  const [altTag, setAltTag] = useState(props.books?.alt);
  // const product = products.find((currentProduct) => {
  //   if (currentProduct.id === props.id) {
  //     return true;
  //   }
  //   console.log(false);
  //   return false;
  // });

  if (!props.books) {
    return (
      <Layout>
        <Head>
          <title>User not found</title>
        </Head>
        User not found.
      </Layout>
    );
  }
  return (
    <Layout>
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
        <AddToCart title={title} id={id}></AddToCart>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  const { getBookById } = await import('../../util/database');
  const books = await getBookById(id);
  console.log(books);

  const props = {};
  if (books) props.books = books[0];

  return {
    props: props,
  };
}
