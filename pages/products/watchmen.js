import Layout from '../components/Layout.js';
// import { products } from '../../util/database';
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
export default function Shop() {
  const watchmen = products[1];
  return (
    <Layout>
      <h1>Watchmen - Alan Moore</h1>
      <div style={allProductsContainer}>
        <div style={productContainer}>
          <a>
            <img
              src={watchmen.productImage}
              alt="Watchmen by Allen Moore"
            ></img>
          </a>
          <p>
            {watchmen.firstName} {watchmen.lastName}
          </p>
          <p>{watchmen.title}</p>
          <p>Price: {watchmen.price}</p>
        </div>
        <AddToCart></AddToCart>
      </div>
    </Layout>
  );
}
