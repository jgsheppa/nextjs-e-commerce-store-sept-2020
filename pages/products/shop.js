import Layout from '../components/Layout.js';
import { products } from '../../util/database';
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
  const [productsInShoppingCart, setProductsInShoppingCart] = useState([]);

  return (
    <Layout>
      <div style={containerStyles}>
        <h1>The Nook</h1>
      </div>
      <div style={allProductsContainer}>
        {products.map((product) => {
          return (
            <div style={productContainer} key={product.id}>
              <Link href={`/products/${product.id}`}>
                <a>
                  <img src={product.productImage} alt={product.alt}></img>
                </a>
              </Link>
              <p>
                <b>
                  {product.firstName} {product.lastName}
                </b>
              </p>
              <p>
                <i>{product.title}</i>
              </p>
              <p>Price: {product.price}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
