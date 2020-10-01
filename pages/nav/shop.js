import Layout from '../components/Layout.js';
import { products } from '../../util/database';

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
export default function Shop() {
  return (
    <Layout>
      <h1>Shop</h1>
      <div style={allProductsContainer}>
        {products.map((product) => {
          return (
            <div style={productContainer} key={product.id}>
              <a>
                <img
                  src={product.productImage}
                  alt="kobo abe's novel woman in the dunes"
                ></img>
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
