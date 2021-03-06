import Head from 'next/head';
import Layout from '../components/Layout';
import { Style } from '../util/types';

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
  borderColor: '#2f2828',
  maxWidth: '480px',
};

export default function Index() {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div style={textContainer}>
          <div style={textStyles}>
            <h1>Thank You For Your Purchase!</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}
