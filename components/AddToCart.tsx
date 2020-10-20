import Link from 'next/link';
import { addProductToCookieCart } from '../util/cookie.js';
import { Style } from '../util/types';

const addToCartStyles: Style = {
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

const addButtonStyles: Style = {
  padding: '10px 20px',
  backgroundColor: '#5963DE',
  color: '#fff',
  borderRadius: '15px',
};

type Props = {
  id: number;
  count: number | undefined;
};

export default function AddToCart(props: Props) {
  console.log(props);
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
          <a
            data-cy="add-product-to-cart"
            style={addButtonStyles}
            onClick={() => addProductToCookieCart(props.id)}
          >
            Add To Cart
          </a>
        </Link>
      </div>
    </>
  );
}

// export function getServerSideProps(context) {
//   const props = {};
//   if (books) props.books = books[0];
//   const bookInCart = allCookies.book || [];

//   return {
//     props: props,
//     bookInCart,
//   };
// }
