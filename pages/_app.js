import '../styles/globals.css';
import { sumQuantityOfProducts } from '../util/cookie.js';

function MyApp({ Component, pageProps }) {
  return (
    <Component
      sumQuantityOfProducts={sumQuantityOfProducts}
      {...pageProps}
    ></Component>
  );
}

export default MyApp;
