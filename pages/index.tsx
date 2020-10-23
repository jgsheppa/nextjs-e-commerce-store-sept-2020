import Head from 'next/head';
import Layout from '../components/Layout';
import { sumQuantityOfProducts } from '../util/cookie.js';
import { Style } from '../util/types';
import Link from 'next/link';

const containerStyles: Style = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  margin: '36px 0 100px',
  paddingTop: '36px',
  borderTop: 'double',
};

const sleepBookFlexBox: Style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 'auto',
};

const sleepBookStyles: Style = {
  maxWidth: '400px',
  maxHeight: 'auto',
  marginTop: '20px',
};

const textStyles: Style = {
  display: 'flex',
  flexDirection: 'Column',
  alignItems: 'flex-start',
  maxWidth: '450px',
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
        <div style={containerStyles}>
          <div style={sleepBookFlexBox}>
            <div style={textStyles}>
              <h1 style={{ borderBottom: 'double', padding: '0 0 8px' }}>
                Find Your Stories
              </h1>
              <p>
                Book Nook is an online shop for classic titles and bestsellers
                alike. We find and promote the best editions and translations of
                foreign titles on the market. In our online shop, you can search
                for books by author, genre, and time period, among other
                filters. We do our best to offer customers books in both the
                original language and a number of translations. When you click
                on a title, you will also be able to choose the language in
                which you would like to experience a given novel or story.
                Additionally, you have the option to choose from multiple
                translations of the same title.{' '}
              </p>
            </div>
            <div>
              <Link href={`/products/3`}>
                <a>
                  <img style={sleepBookStyles} src="/ginafranco.png" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
