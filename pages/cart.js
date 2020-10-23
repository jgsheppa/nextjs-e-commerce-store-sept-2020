import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
import { centsToDollars } from './../util/helper';
import { getCartFromCookies, sumQuantityOfProducts } from './../util/cookie';

const pageContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: '100px',
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginLeft: '20px',
};

const itemBorder = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  border: 'double',
  borderColor: '#000',
  borderRadius: '20px',
  width: '700px',
  margin: '20px 0 20px 20px',
};

const itemInfoStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  maxWidth: '1000px',
  maxHeight: '150px',
  minHeight: '150px',
  minWidth: '400px',
  width: '500px',
  padding: '30px 20px',
};

const quatityStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  marginBottom: '10px',
};

const removeItemStyles = {
  padding: '10px 20px',
  backgroundColor: '#5963DE',
  color: '#fff',
  borderRadius: '15px',
};

const buttonBorderStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  border: 'double',
  borderWidth: '8px',
  borderRadius: '15px',
  borderColor: '#000',
  padding: '40px',
  marginRight: '30px',
};

const purchaseButtonStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '30px 50px',
  borderRadius: '15px',
  backgroundColor: '#DE5963',
  color: '#fff',
};

const imageStyles = {
  padding: '20px',
  maxHeight: '300px',
  maxWidth: 'auto',
};

const productInfoStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'space-evenly',
  justifyContent: 'center',
};

const productDetailStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  marginBottom: '20px',
  lineHeight: '2',
  maxWidth: '300px',
};

const subTotalStyles = {
  marginBottom: '16px',
};

export default function Cart(props) {
  const sumOfProductsCalculator = sumQuantityOfProducts();
  const [allProducts, setAllProducts] = useState(props.props.books);

  const cookieCart = getCartFromCookies();
  console.log('allProducts', allProducts);

  const [productCookies, setProductCookies] = useState(cookieCart);

  const cookieProductIds = productCookies.map((item) => {
    if (item.count > 0) {
      return item.id;
    }
    item;
  });

  const bookInfoIds = allProducts.map((item) => item.id);

  function addQtyToBookInfo(bookInfo, cookieIds, bookIds, cookies) {
    const newBookInfo = [...bookInfo];
    for (let i = 0; i < bookIds.length; i++) {
      if (cookieIds.includes(newBookInfo[i].count)) {
        newBookInfo[i].count = cookies[i]?.count;
        console.log(newBookInfo);
      }
    }
    return newBookInfo;
  }

  // function addCountToCookies(products, cookies, cookieIds) {
  //   const newProductArray = [...products];
  //   newProductArray.map((product) => {
  //     for (let i = 0; i < newProductArray.length; i++) {
  //       if (cookieIds.includes(product.id)) {
  //         product.count = cookies[i]?.count;
  //       }
  //     }
  //     return product;
  //   });
  // }

  // console.log(addCountToCookies(allProducts, productCookies, cookieProductIds));

  const bookInfoWithQty = addQtyToBookInfo(
    allProducts,
    cookieProductIds,
    bookInfoIds,
    productCookies,
  );

  console.log(bookInfoWithQty);

  function putItemsInCart(cartItems, idNums) {
    const itemArray = [];
    for (let i = 0; i < allProducts.length; i++) {
      if (idNums.includes(cartItems[i].id)) {
        itemArray.push(cartItems[i]);
      }
    }
    return itemArray;
  }

  const cart = putItemsInCart(bookInfoWithQty, cookieProductIds);

  // const [cartState, setCartState] = useState(cart);

  function findSubtotal(products, cookieObjs) {
    let total = 0;
    for (let i = 0; i < cookieObjs.length; i++) {
      for (let j = 0; j < cookieObjs.length; j++) {
        if (products[i].id === cookieObjs[j].id) {
          total += products[i].price * cookieObjs[j].count;
        }
      }
    }
    return total;
  }

  const subTotal = findSubtotal(allProducts, productCookies);

  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <h1
          style={{
            borderBottom: 'double',
            padding: '0 0 36px',
            borderWidth: '3px',
          }}
        >
          Your Cart
        </h1>
        <div style={pageContainer}>
          <div style={containerStyles}>
            {cart.map((book) => (
              <div key={book.id} style={itemBorder}>
                <div style={productInfoStyles}>
                  <img style={imageStyles} src={book.productImage} />
                  <div style={productDetailStyles}>
                    <div>
                      <b>
                        {book.firstName} {book.lastName}
                      </b>
                    </div>
                    <div>
                      <i>{book.title}</i>
                    </div>
                    <div>{centsToDollars(book.price)}</div>
                  </div>
                </div>
                <div style={itemInfoStyles}>
                  <div style={quatityStyles}>
                    <div>Quantity: </div>
                    <select>
                      <option>{book.count}</option>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5+</option>
                    </select>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        props.deletedProduct;
                        setProductCookies(cookieCart);
                      }}
                      style={removeItemStyles}
                      data-cy="remove-button"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ margin: '72px 0 0 40px' }}>
            <div style={buttonBorderStyles}>
              <div style={subTotalStyles}>
                <div>
                  <b>Subtotal:</b>
                  {centsToDollars(subTotal)}
                </div>
              </div>
              <Link href="/checkout" data-cy="go-to-checkout-button">
                <a data-cy="go-to-checkout-button" style={purchaseButtonStyles}>
                  Proceed To Checkout
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBooks } = await import('../util/database');
  const { getCartFromCookies, deleteProductFromCookieCart } = await import(
    '../util/cookie'
  );

  const books = await getBooks();
  const props = {};
  if (books) props.books = books;

  const bookId = parseInt(context.query.id);
  const deletedProduct = deleteProductFromCookieCart(bookId);

  return {
    props: { props, deletedProduct },
  };
}
