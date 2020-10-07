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
export default function DerProzess({ cart }) {
  return (
    <Layout>
      <h1>Der Prozess - Franz Kafka</h1>
      <div style={allProductsContainer}>
        <div style={productContainer}>
          <a>
            <img
              src={products[2].productImage}
              alt="kobo abe's novel woman in the dunes"
            ></img>
          </a>
          <p>
            {products[2].firstName} {products[2].lastName}
          </p>
          <p>{products[2].title}</p>
          <p>Price: {products[2].price}</p>
        </div>
        <AddToCart cart={cart}></AddToCart>
      </div>
    </Layout>
  );
}
