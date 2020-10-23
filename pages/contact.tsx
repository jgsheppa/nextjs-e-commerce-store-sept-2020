import Layout from '../components/Layout';
import { Style } from './../util/types';

const containerStyles: Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const infoContainer: Style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
};

const textFlexBox: Style = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  textAlign: 'justify',
};

export default function Contact() {
  return (
    <>
      <Layout>
        <div style={containerStyles}>
          <div style={infoContainer}>
            <h1>Contact Us</h1>
            <div style={textFlexBox}>
              <p>E-mail: booknookteam@booknook.com</p>
              <p>Phone: 555-BOOK</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
