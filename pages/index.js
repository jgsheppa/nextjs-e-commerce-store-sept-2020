import Head from 'next/head';
import Layout from './components/Layout.js';
import Cookies from 'next-cookies';
import Link from 'next/link';
import { products } from './../util/database';

const containerStyles = {
  // display: 'flex',
  // flexDirection: 'column',
  // alignContent: 'center',
};

const textFlexBox = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: 'auto',
};

const sleepBookStyles = {
  maxWidth: '400px',
  maxHeight: 'auto',
  marginTop: '20px',
};

const textStyles = {
  display: 'flex',
  flexDirection: 'Column',
  alignItems: 'flex-start',
  maxWidth: '450px',
};

export default function Index() {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div style={containerStyles}></div>
        <div style={containerStyles}>
          <div style={textFlexBox}>
            <div style={textStyles}>
              <h1>Find Your Stories</h1>
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
            <Link href={`/products/${products[3].id}`}>
              <a>
                <img style={sleepBookStyles} src="/sleepbook.jpg" />;
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
