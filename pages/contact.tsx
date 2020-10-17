import Layout from '../components/Layout';
import { sumQuantityOfProducts } from './../util/cookie.js';
import { Style } from './../util/types';

const containerStyles: Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const infoContainer: Style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
};

const textFlexBox: Style = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  textAlign: 'justify',
};

export default function Contact() {
  const sumOfProductsCalculator = sumQuantityOfProducts();
  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <div style={containerStyles}>
          <div style={infoContainer}>
            <h1>Contact Us</h1>
            <div style={textFlexBox}>
              <p>E-mail: booknookteam@booknook.com</p>
              <p>Phone: 555-BOOK</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const allCookies = nextCookies(context);
//   const productInCart = allCookies.productInCart || [];

//   const numOfProducts = Object.values(allCookies);
//   const reducer = (accumulator, currentValue) =>
//     parseInt(accumulator) + parseInt(currentValue);
//   function calcSumOfProducts() {
//     if (numOfProducts.length > 0) {
//       return numOfProducts.reduce(reducer);
//     } else {
//       return 0;
//     }
//   }

//   const sumOfProducts = calcSumOfProducts();

//   return {
//     props: { sumOfProducts },
//   };
// }
