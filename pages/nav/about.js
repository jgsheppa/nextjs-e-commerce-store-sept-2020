import Layout from '../components/Layout.js';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const infoContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
};
const textFlexBox = {
  display: 'flex',
  maxWidth: '400px',
  textAlign: 'justify',
};

export default function AboutUs() {
  return (
    <Layout>
      <div style={containerStyles}>
        <div style={infoContainer}>
          <h1>About Us</h1>
          <div style={textFlexBox}>
            <p>
              Book Nook is an online shop for classic titles and bestsellers
              alike. We find and promote the best editions and translations of
              foreign titles on the market. In our online shop, you can search
              for books by author, alphabetically, genre, time period, and many
              other filters. We do our best to offer customers books in both the
              original language and a number of translations. When you click on
              a title, you will also be able to choose the language in which you
              would like to experience a given novel or story. Additionally, you
              have the option to choose from multiple translations of the same
              title.{' '}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
