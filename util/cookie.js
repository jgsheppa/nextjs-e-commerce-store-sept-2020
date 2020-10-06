import nextCookies from 'next-cookies';
import cookie from 'js-cookie';

export function getServerSideProps(context) {
  console.log(context);
  const allCookies = nextCookies(context);
  const productInCart = allCookies.productInCart || [];

  return {
    props: {
      productInCart: ['1', '2'],
    },
  };
}
