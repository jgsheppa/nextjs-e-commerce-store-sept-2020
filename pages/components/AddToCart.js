import Link from 'next/link';
import { useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import Cookie from 'js-cookie';
import { getProductInCart } from '../../util/cookie';

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
  // const [id, setID] = useState(props.books?.id);
  // const [bookPrice, setBookPrice] = useState(props.books?.price);
  // const [bookTitle, setBookTitle] = useState(props.books?.title);
  const [listOfBooks, setListOfBooks] = useState('');
  const cart = [...listOfBooks, { purchaseCount }];
  const totalCount = 0;

  // useEffect(() => {
  //   Cookie.set('productName', purchaseCount);
  // }, []);

  Cookie.set('productName', totalCount);
  // function handleChange(e) {
  //   const addToCart = e.target.value;
  //   document.cookie = `name=${product}; path=/products/${id}`;
  // }
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

        <button
          style={addButtonStyles}
          value={props.id}
          onClick={() => setPurchaseCount(totalCount + 1)}
        >
          <Link href="/confirmAddToCart">
            <a>Add To Cart</a>
          </Link>
        </button>
      </div>
    </>
  );
}

export function getServerSideProps(context) {
  console.log(context);
  const allCookies = nextCookies(context);
  const productInCart = allCookies.productInCart || [];

  return {
    props: {
      productInCart: ['1', '2'],
    },
  };
}
