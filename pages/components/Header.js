import Head from 'next/head';
import Link from 'next/link';

const headerStyles = {
  margin: '0 10%',
};

const headerContainerStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  maxWidth: '1000px',
};

const navStyles = {
  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'center',
  // alignContent: 'space-around',
  // maxWidth: '200px',
  fontSize: '24px',
  fontWeight: '300',
  marginLeft: '10px',
};

export default function Header() {
  return (
    <>
      <Head>
        <title>Book Nook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={headerStyles}>
        <div style={headerContainerStyles}>
          <a href="/">
            <img
              style={{ maxHeight: '100px', maxWidth: 'auto' }}
              src="/booknook_logo.jpg"
              alt="book nook logo"
            />
          </a>

          <div>
            <Link href="/nav/shop">
              <a style={navStyles}>Shop</a>
            </Link>
            <Link href="/nav/about">
              <a style={navStyles}>About</a>
            </Link>
            <Link href="/nav/contact">
              <a style={navStyles}>Contact</a>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
