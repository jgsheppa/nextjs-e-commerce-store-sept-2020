import Layout from '../components/Layout.js';
import { products } from '../../util/database';
import AddToCart from '../components/AddToCart.js';

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
export default function WomanInTheDunes() {
  return (
    <Layout>
      <h1>The Woman in the Dunes - Kobo Abe</h1>
      <div style={allProductsContainer}>
        <div style={productContainer}>
          <a>
            <img
              src={products[0].productImage}
              alt="kobo abe's novel woman in the dunes"
            ></img>
          </a>
          <p>
            {products[0].firstName} {products[0].lastName}
          </p>
          <p>{products[0].title}</p>
          <p>Price: {products[0].price}</p>
        </div>
        <AddToCart></AddToCart>
      </div>
    </Layout>
  );
}
