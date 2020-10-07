// import cookies from 'js-cookies';

export function getProductInCart() {
  const product = cookie.getJSON('product') || [];
  return product;
}
