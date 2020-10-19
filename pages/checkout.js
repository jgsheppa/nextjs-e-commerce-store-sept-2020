import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { sumQuantityOfProducts, getCartFromCookies } from './../util/cookie';
import { centsToDollars } from './../util/helper';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const pageContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: '100px',
};
const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-around',
  marginLeft: '20px',
};

const itemBorder = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  border: 'solid',
  borderColor: '#000',
  borderRadius: '20px',
  maxWidth: '800px',
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
  justifyContent: 'space-around',
  alignContent: 'center',
  border: 'solid',
  borderRadius: '15px',
  borderColor: '#000',
  padding: '40px',
  marginRight: '30px',
};

// const purchaseButtonStyles = {
//   fontSize: '20px',
//   fontWeight: 'bold',
//   padding: '30px 50px',
//   borderRadius: '15px',
//   backgroundColor: '#DE5963',
//   color: '#fff',
// };

// const imageStyles = {
//   padding: '20px',
//   maxHeight: '300px',
//   maxWidth: 'auto',
// };

// const productInfoStyles = {
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'space-evenly',
//   justifyContent: 'center',
// };

// const productDetailStyles = {
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-end',
//   alignItems: 'flex-start',
//   marginBottom: '20px',
//   lineHeight: '2',
// };

// const formStyles = {
//   padding: '8px 32px',
//   borderRadius: '4px',
//   border: '1px solid #cccccc',
//   fontSize: '16px',
//   marginBottom: '8px',
// };

const formContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  // alignItems: 'space-around',
  // justifyContent: 'flex-start',
  marginLeft: '20px',
};

const cardExpireInfo = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'space-between',
  justifyContent: 'space-between',
};

const submitButtonStyles = {
  padding: '24px 40px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#DE5963',
  borderRadius: '8px',
  textAlign: 'center',
};

const subtotalButtonStyles = {
  display: 'flex',
  flexDirection: 'row',
};

const nameInputStyles = {
  display: 'flex',
  flexDirection: 'row',
};

export default function Cart(props) {
  const sumOfProductsCalculator = sumQuantityOfProducts();
  const [allProducts, setAllProducts] = useState(props.props.books);
  // const [deleteProduct, setDeleteProduct] = useState(cookieCart);
  console.log(allProducts);

  const cookieCart = getCartFromCookies();

  const cookieProductIds = cookieCart.map((item) => {
    if (item.count > 0) {
      return item.id;
    }
    item;
  });

  const bookInfoIds = allProducts.map((item) => item.id);

  function addQtyToBookInfo(bookInfo, cookieIds, bookIds, cookies) {
    const newBookInfo = [...bookInfo];
    // const newBookInfo = [];
    for (let i = 0; i < bookInfo.length; i++) {
      if (cookieIds.includes(bookIds[i])) {
        newBookInfo[i].count = cookies[i].count;
      }
    }
    return newBookInfo;
  }

  const bookInfoWithQty = addQtyToBookInfo(
    allProducts,
    cookieProductIds,
    bookInfoIds,
    cookieCart,
  );

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

  const [cartState, setCartState] = useState(cart);

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

  const subTotal = findSubtotal(allProducts, cookieCart);

  return (
    <>
      <Layout sumOfProductsCalculator={sumOfProductsCalculator}>
        <h1>Checkout</h1>
        <div style={pageContainer}>
          <div style={containerStyles}>
            <div>
              <Formik
                initialValues={{
                  email: '',
                  firstname: '',
                  lastname: '',
                  streetaddress: '',
                  aptnumber: '',
                  city: '',
                  state: '',
                  country: '',
                  zipcode: '',
                  cardholder: '',
                  cardnumber: '',
                  mm: '',
                  yy: '',
                  securitynumber: '',
                }}
                validate={(values) => {
                  const errors = {};

                  if (!values.firstname) {
                    errors.firstname = 'Required';
                  } else if (!/[a-zA-Z]+/i.test(values.firstname)) {
                    errors.firstname = 'Invalid first name';
                  } else if (!values.lastname) {
                    errors.lastname = 'Required';
                  } else if (!/[a-zA-Z]+/i.test(values.lastname)) {
                    errors.lastname = 'Invalid last name';
                  } else if (!values.streetaddress) {
                    errors.streetaddress = 'Required';
                  } else if (!/[\da-zA-Z\s(.)]+/i.test(values.streetaddress)) {
                    errors.streetaddress = 'Invalid street address';
                  } else if (!values.aptnumber) {
                    errors.aptnumber = 'Required';
                  } else if (!/\d+/i.test(values.aptnumber)) {
                    errors.aptnumber = 'Invalid apartment number';
                  } else if (!values.city) {
                    errors.city = 'Required';
                  } else if (!/[a-zA-Z]+/i.test(values.city)) {
                    errors.city = 'Invalid city';
                  } else if (!values.state) {
                    errors.state = 'Required';
                  } else if (!/[a-zA-Z]+/i.test(values.state)) {
                    errors.state = 'Invalid state';
                  } else if (!values.country) {
                    errors.country = 'Required';
                  } else if (!/[a-zA-Z]+/i.test(values.country)) {
                    errors.country = 'Invalid country';
                  } else if (!values.zipcode) {
                    errors.zipcode = 'Required';
                  } else if (!/\d+/i.test(values.zipcode)) {
                    errors.zipcode = 'Invalid zip code';
                  } else if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email,
                    )
                  ) {
                    errors.email = 'Invalid email address';
                  } else if (!values.cardholder) {
                    errors.cardholder = 'Required';
                  } else if (!/[a-zA-Z]+/i.test(values.cardholder)) {
                    errors.cardholder = 'Invalid cardholder name';
                  } else if (!values.cardnumber) {
                    errors.cardnumber = 'Required';
                  } else if (!/\d+/i.test(values.cardnumber)) {
                    errors.cardnumber = 'Invalid card number';
                  } else if (!values.mm) {
                    errors.mm = 'Required';
                  } else if (!/\d{2}/i.test(values.mm)) {
                    errors.mm = 'Invalid month number';
                  } else if (!values.yy) {
                    errors.yy = 'Required';
                  } else if (!/\d{2}/i.test(values.yy)) {
                    errors.yy = 'Invalid year';
                  } else if (!values.securitynumber) {
                    errors.securitynumber = 'Required';
                  } else if (!/\d{4}/i.test(values.securitynumber)) {
                    errors.securitynumber = 'Invalid security number';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div style={formContainerStyles}>
                      <h2>Shipping Address</h2>
                      <div style={nameInputStyles}>
                        <div>
                          <Field
                            className="inputfield"
                            type="firstname"
                            name="firstname"
                            placeholder="First Name"
                          />
                          <ErrorMessage name="firstname" component="div" />
                        </div>
                        <div>
                          <Field
                            className="inputfield"
                            type="lastname"
                            name="lastname"
                            placeholder="Last Name"
                          />
                          <ErrorMessage name="lastname" component="div" />
                        </div>
                      </div>
                      <Field
                        className="inputfield"
                        type="streetaddress"
                        name="streetaddress"
                        placeholder="Street Address"
                      />
                      <ErrorMessage name="streetaddress" component="div" />
                      <Field
                        className="inputfield"
                        type="aptnumber"
                        name="aptnumber"
                        placeholder="Apt Number"
                      />
                      <ErrorMessage name="aptnumber" component="div" />
                      <Field
                        className="inputfield"
                        type="city"
                        name="city"
                        placeholder="City"
                      />
                      <ErrorMessage name="city" component="div" />
                      <Field
                        className="inputfield"
                        type="state"
                        name="state"
                        placeholder="State"
                      />
                      <ErrorMessage name="state" component="div" />
                      <Field
                        className="inputfield"
                        type="country"
                        name="country"
                        placeholder="Country"
                      />
                      <ErrorMessage name="country" component="div" />
                      <Field
                        className="inputfield"
                        type="zipcode"
                        name="zipcode"
                        placeholder="Zip Code"
                      />
                      <ErrorMessage name="zipcode" component="div" />
                      <Field
                        className="inputfield"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                      />
                      <ErrorMessage name="email" component="div" />
                    </div>
                    <div style={formContainerStyles}>
                      <h2>Paymend Method</h2>
                      <Field
                        className="inputfield"
                        type="cardholder"
                        name="cardholder"
                        placeholder="Cardholder"
                      />
                      <ErrorMessage name="cardholder" component="div" />
                      <Field
                        className="inputfield"
                        type="cardnumber"
                        name="cardnumber"
                        placeholder="Card Number"
                      />
                      <ErrorMessage name="cardnumber" component="div" />
                      <div style={cardExpireInfo}>
                        <div>
                          <Field
                            className="inputfield"
                            type="mm"
                            name="mm"
                            placeholder="MM"
                            margin="0 8px 0 0"
                          />
                          <ErrorMessage name="mm" component="div" />
                        </div>
                        <div>
                          <Field
                            className="inputfield"
                            type="yy"
                            name="yy"
                            placeholder="YY"
                          />
                          <ErrorMessage name="yy" component="div" />
                        </div>
                      </div>
                      <Field
                        className="inputfield"
                        type="securitynumber"
                        name="securitynumber"
                        placeholder="Security Number"
                      />
                      <ErrorMessage name="securitynumber" component="div" />
                      <Link href="/thankYouPage">
                        <a
                          style={submitButtonStyles}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Place Your Order
                        </a>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div>
            <div style={buttonBorderStyles}>
              <div style={subtotalButtonStyles}>
                <b>Subtotal:</b>
                <div>{centsToDollars(subTotal)}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBooks } = await import('../util/database');
  const { getCartFromCookies, toggleItemsInCartInCookie } = await import(
    '../util/cookie'
  );

  console.log(`My cookies: ${getCartFromCookies()}`);

  const books = await getBooks();
  const props = {};
  if (books) props.books = books;

  console.log(toggleItemsInCartInCookie(props.books.id));

  const allCookies = nextCookies(context);

  const numOfProducts = Object.values(allCookies);
  const reducer = (accumulator, currentValue) =>
    parseInt(accumulator) + parseInt(currentValue);
  function calcSumOfProducts() {
    if (numOfProducts.length > 0) {
      return numOfProducts.reduce(reducer);
    } else {
      return 0;
    }
  }

  const cookieKeys = Object.keys(allCookies);
  const cookieKeysToInt = cookieKeys.map((value) => parseInt(value));
  // console.log(cookieKeys);
  // console.log(cookieKeysToInt);

  const sumOfProducts = calcSumOfProducts();
  return {
    props: { props, sumOfProducts, allCookies, cookieKeysToInt },
  };
}
