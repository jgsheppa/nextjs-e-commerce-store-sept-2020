import Layout from '../components/Layout.js';
// import { products } from '../../util/database';
import Link from 'next/link';
import { useState } from 'react';

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
  return (
    <Layout>
      <div style={containerStyles}>
        <h1>The Nook</h1>
      </div>
      <div style={allProductsContainer}>
        {props.books.map((book) => {
          return (
            <div style={productContainer} key={book.id}>
              <Link href={`/products/${book.id}`}>
                <a>
                  <img src={book.productImage} alt={book.alt}></img>
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
              <p>Price: {book.price}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getBooks } = await import('../../util/database');
  const books = await getBooks();
  console.log(books);

  const props = {};
  if (books) props.books = books;

  return {
    props: props,
  };
}
