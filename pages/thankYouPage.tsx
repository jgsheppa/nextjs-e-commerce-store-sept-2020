import Head from 'next/head';
import Layout from '../components/Layout';
import { Style } from '../util/types';
import { sumQuantityOfProducts } from './../util/cookie';

const textContainer: Style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const textStyles: Style = {
  marginTop: '48px',
  padding: '12px 36px',
  border: 'double',
  borderWidth: '8px',
  maxWidth: '480px',
};

export default function Index() {
  const sumOfProductsCalculator = sumQuantityOfProducts();
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <div style={textContainer}>
          <div style={textStyles}>
            <h1>Thank You For Your Purchase!</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}
