import Head from 'next/head';
import Header from './Header.js';
import Footer from './Footer.js';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
