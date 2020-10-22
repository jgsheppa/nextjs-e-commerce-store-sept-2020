export function sumQuantityOfProducts(cart) {
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
  const addProduct = 1;

  const newCart = cart.map((obj) => {
    if (obj.id === bookId) {
      obj.count += addProduct;
    }
    return obj;
  });

  return newCart;
}

export function deleteProductFromCookieCart(cart, bookId) {
  const addProduct = 0;

  const newCart = cart.map((obj) => {
    if (obj.id === bookId) {
      obj.count = addProduct;
    }
    return obj;
  });

  return newCart;
}

// Add count to database array

export function addQtyToBookInfo(bookInfo, cookieIds, bookIds, cookies) {
  const newBookInfo = [...bookInfo];
  for (let i = 0; i < bookInfo.length; i++) {
    if (cookieIds.includes(bookIds[i])) {
      newBookInfo[i].count = cookies[i].count;
    }
  }
  return newBookInfo;
}
