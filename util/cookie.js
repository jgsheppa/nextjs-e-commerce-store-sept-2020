// import cookies from '../components/node_modules/js-cookie';
import cookies from 'js-cookie';

export function getCartFromCookies() {
  const cart = cookies.getJSON('book') || [];
  return cart;
}

export function makeCookie(bookId) {
  const cart = getCartFromCookies();

  //Gets Id from Cookie
  const mappedCart = cart.map((cartItems) => cartItems.id);

  let newCart;

  if (mappedCart.includes(bookId)) {
    // Checks if cookie has been made for given product
    // newCart = cart.filter((cartItems) => cartItems.id === bookId);
    newCart = cart;
  } else {
    // If product id is not in the cookie-cart
    // then put it in the cart
    newCart = [...cart, { id: bookId, count: 0 }];
  }

  cookies.set('book', newCart);

  return newCart;
}

export function addProductToCookieCart(bookId) {
  const cart = getCartFromCookies();
  const addProduct = 1;

  const newCart = cart.map((obj) => {
    if (obj.id === bookId) {
      obj.count += addProduct;
    }
    return obj;
  });

  cookies.set('book', newCart);

  return newCart;
}

export function sumQuantityOfProducts() {
  const cart = getCartFromCookies();

  const findCartValues = cart.map((item) => item.count);

  const reducer = (accumulator, currentValue) =>
    parseInt(accumulator) + parseInt(currentValue);

  function calcSumOfProducts() {
    if (cart.length > 0) {
      return findCartValues.reduce(reducer);
    } else {
      return 0;
    }
  }
  return calcSumOfProducts();
}

export function toggleItemsInCartInCookie(id) {
  // ['1', '3']
  const cart = getCartFromCookies();

  let newCart = [...cart, { id }];

  cookies.set('book', newCart);

  return newCart;
}
