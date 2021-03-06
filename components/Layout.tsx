import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

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
