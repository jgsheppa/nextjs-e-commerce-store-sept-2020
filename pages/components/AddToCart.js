import Link from 'next/link';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import Cookie from 'js-cookie';
import { getProductInCart } from '../../util/cookie';
import Layout from './Layout';

const addToCartStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
  padding: '15px 40px',
  border: 'solid',
  borderRadius: '15px',
  borderColor: '#000',
  borderWidth: '3px',
  margin: '0',
};

const addButtonStyles = {
  padding: '10px 20px',
  backgroundColor: '#5963DE',
  color: '#fff',
  borderRadius: '15px',
};

export default function AddToCart(props) {
  const [id, setID] = useState(props.books?.id);

  return (
    <>
      <div style={addToCartStyles}>
        <p>Price: </p>
        <p>In Stock</p>
        <div>
          <div>Quantity:</div>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <Link href="/confirmAddToCart">
          <a style={addButtonStyles} onClick={props.handleChange}>
            Add To Cart
          </a>
        </Link>
      </div>
    </>
  );
}

export function getServerSideProps(context) {
  const props = {};
  if (books) props.books = books[0];

  return {
    props: props,
  };
}
