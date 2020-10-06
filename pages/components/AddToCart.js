import Link from 'next/link';
import { useState } from 'react';
import cookies from 'next-cookies';
import Cookies from 'js-cookie';

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

export default function AddToCart() {
  const [product, setProduct] = useState('Book');
  const [cart, setCart] = useState([]);
  const wholeCart = [...cart];

  Cookies.set('productName', { product });
  function handleChange(e) {
    const addToCart = e.target.value;
    document.cookie = `name=${product}; path=/single_shopping_pages/woman_in_the_dunes`;
  }
  return (
    <>
      <div style={addToCartStyles}>
        <p>Price: </p>
        {/* In Stock will eventually be a property */}
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

        <button style={addButtonStyles}>
          <Link onClick={handleChange} href="/checkout/confirmAddToCart">
            <a>Add To Cart</a>
          </Link>
        </button>
      </div>
    </>
  );
}
