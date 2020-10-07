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
export default function product(props) {
  const product = products.find((currentProduct) => {
    if (currentProduct.id === props.id) {
      return true;
    }
    console.log(false);
    return false;
  });
  return (
    <Layout>
      <h1>{props.title}</h1>
      <div style={allProductsContainer}>
        <div style={productContainer}>
          <a>
            <img src={product.productImage} alt={product.alt}></img>
          </a>
          <p>
            {product.firstName} {product.lastName}
          </p>
          <p>{product.title}</p>
          <p>Price: {product.price}</p>
        </div>
        <AddToCart></AddToCart>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { id: context.query.id },
  };
}
