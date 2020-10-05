import Layout from '../components/Layout.js';
import { products } from '../../util/database';

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
export default function Shop() {
  return (
    <Layout>
      <div style={containerStyles}>
        <h1>The Nook</h1>
      </div>
      <div style={allProductsContainer}>
        {products.map((product) => {
          return (
            <div style={productContainer} key={product.id}>
              <a href={product.href}>
                <img src={product.productImage} alt={product.alt}></img>
              </a>
              <p>
                {product.firstName} {product.lastName}
              </p>
              <p>{product.title}</p>
              <p>Price: {product.price}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

// /Users/jamessheppard/Desktop/Coding/nextjs-e-commerce-store-sept-2020/pages/nav/shop.js

// /Users/jamessheppard/Desktop/Coding/nextjs-e-commerce-store-sept-2020/util/database.js
