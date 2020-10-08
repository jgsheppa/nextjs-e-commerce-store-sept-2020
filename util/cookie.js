import cookies from 'js-cookie';

export function getProductInCart() {
  const product = cookies.getJSON('product') || [];
  return product;
}
