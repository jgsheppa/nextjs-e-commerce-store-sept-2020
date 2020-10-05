import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './components/Layout.js';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
export default function Index() {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div style={containerStyles}>
          <h1>Welcome to Book Nook!</h1>
        </div>
      </Layout>
    </>
  );
}
