export function sumQuantityOfProducts(cart) {
  // const cart = getCartFromCookies();

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

export function addProductToCookieCart(cart, bookId) {
  // const cart = getCartFromCookies();
  const addProduct = 1;

  const newCart = cart.map((obj) => {
    if (obj.id === bookId) {
      obj.count += addProduct;
    }
    return obj;
  });

  // cookies.set('book', newCart);

  return newCart;
}

export function deleteProductFromCookieCart(cart, bookId) {
  // const cart = getCartFromCookies();
  const addProduct = 0;

  const newCart = cart.map((obj) => {
    if (obj.id === bookId) {
      obj.count = addProduct;
    }
    return obj;
  });

  // cookies.set('book', newCart);

  return newCart;
}
