import cookies from 'js-cookie';

export function getCartFromCookies() {
  const cart = cookies.getJSON('book') || [];
  return cart;
}

export function addProductToCookieCart(bookId) {
  const cart = getCartFromCookies();
  const addProduct = 1;

  // If cart has the key bookId in it
  // then increment the count stored at that id
  // otherwise add a new key value pair
  // bookId: 1
  let foundInCart = false;

  const newCart = cart.map((obj) => {
    if (obj.id === bookId) {
      foundInCart = true;
      obj.count += addProduct;
    }
    return obj;
  });

  if (!foundInCart) {
    newCart.push({ id: bookId, count: 1 });
  }

  cookies.set('book', newCart);

  return newCart;
}

export function deleteProductFromCookieCart(bookId) {
  const cart = getCartFromCookies();
  const removeProduct = 0;

  // If cart has the key bookId in it
  // then decrease the count stored at that id
  // otherwise add a new key value pair
  // bookId: 1
  let foundInCart = false;

  const newCart = cart.map((obj) => {
    if (obj.id === bookId) {
      foundInCart = true;
      obj.count = removeProduct;
    }
    return obj;
  });

  cookies.set('book', newCart);

  return newCart;
}

export function deleteAllProductsFromCookieCart() {
  // const cart = getCartFromCookies();

  // // If cart has the key bookId in it
  // // then decrease the count stored at that id
  // // otherwise add a new key value pair
  // // bookId: 1
  // let foundInCart = false;

  // const newCart = cart.map((obj) => {
  //   if (obj.id === bookId) {
  //     foundInCart = true;
  //     obj.count = removeProduct;
  //   }
  //   return obj;
  // });

  const deleteCookie = cookies.remove('book');

  return deleteCookie;
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
  const cart = getCartFromCookies();

  let newCart = [...cart, { id }];

  cookies.set('book', newCart);

  return newCart;
}
