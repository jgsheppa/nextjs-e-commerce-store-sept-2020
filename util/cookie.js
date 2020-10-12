import cookies from 'js-cookie';
import cookie from 'cookie';

export function getProductInCart() {
  const product = cookies.getJSON('product') || [];
  return product;
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
