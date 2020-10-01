import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from './components/Layout.js';

export default function Home() {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main></main>
      </Layout>
    </>
  );
}
