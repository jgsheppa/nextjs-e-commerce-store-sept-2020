import Head from 'next/head';
import Layout from '../components/Layout';
import { Style } from '../util/types';

const containerStyles: Style = {
  // display: 'flex',
  // flexDirection: 'column',
  // alignContent: 'center',
};

const textFlexBox: Style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: 'auto',
};

const textStyles: Style = {
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
          <div>
            <div>
              <h1>Thank You For Your Purchase!</h1>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
