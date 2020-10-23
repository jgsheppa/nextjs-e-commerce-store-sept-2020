import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
import { sumQuantityOfProducts, getCartFromCookies } from './../util/cookie';
import { centsToDollars } from './../util/helper';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const pageContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
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

const formFlexBox = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-around',
  marginBottom: '100px',
};

// const itemBorder = {
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   border: 'solid',
//   borderColor: '#000',
//   borderRadius: '20px',
//   maxWidth: '800px',
// };

// const itemInfoStyles = {
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-around',
//   alignItems: 'flex-end',
//   maxWidth: '1000px',
//   maxHeight: '150px',
//   minHeight: '150px',
//   minWidth: '400px',
//   width: '500px',
//   padding: '30px 20px',
// };

// const quatityStyles = {
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'space-evenly',
//   alignItems: 'flex-end',
//   marginBottom: '10px',
// };

// const removeItemStyles = {
//   padding: '10px 20px',
//   backgroundColor: '#5963DE',
//   color: '#fff',
//   borderRadius: '15px',
// };

const buttonBorderStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignContent: 'center',
  border: 'double',
  borderRadius: '15px',
  borderColor: '#000',
  padding: '40px',
  marginRight: '30px',
};

const shippingContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  marginLeft: '20px',
  borderBottom: 'double',
  borderWidth: '4px',
};

const formContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
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
  margin: '10px 0 48px',
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
  const [allProducts, setAllProducts] = useState(props.props.books);

  console.log('props', props);

  const cookieCart = getCartFromCookies();

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
      <Layout>
        <h1 style={{ borderBottom: 'double', padding: '0 0 36px' }}>
          Checkout
        </h1>
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
                  } else if (!values.aptnumber) {
                    errors.aptnumber = 'Required';
                  } else if (!/\d[a-zA-Z]+/i.test(values.aptnumber)) {
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
                    <div style={formFlexBox}>
                      <div style={shippingContainerStyles}>
                        <h2>Shipping Address</h2>
                        <div style={nameInputStyles}>
                          <div>
                            <Field
                              data-cy="firstname"
                              className="inputfield"
                              type="firstname"
                              name="firstname"
                              placeholder="First Name"
                            />
                            <ErrorMessage name="firstname" component="div" />
                          </div>
                          <div>
                            <Field
                              data-cy="lastname"
                              className="inputfield"
                              type="lastname"
                              name="lastname"
                              placeholder="Last Name"
                            />
                            <ErrorMessage name="lastname" component="div" />
                          </div>
                        </div>
                        <Field
                          data-cy="streetaddress"
                          className="inputfield"
                          type="streetaddress"
                          name="streetaddress"
                          placeholder="Street Address"
                        />
                        <ErrorMessage name="streetaddress" component="div" />
                        <Field
                          data-cy="aptnumber"
                          type="number"
                          className="inputfield"
                          type="aptnumber"
                          name="aptnumber"
                          placeholder="Apt Number"
                        />
                        <ErrorMessage name="aptnumber" component="div" />
                        <Field
                          data-cy="city"
                          className="inputfield"
                          type="city"
                          name="city"
                          placeholder="City"
                        />
                        <ErrorMessage name="city" component="div" />
                        <Field
                          data-cy="state"
                          className="inputfield"
                          type="state"
                          name="state"
                          placeholder="State"
                        />
                        <ErrorMessage name="state" component="div" />
                        <Field
                          data-cy="country"
                          className="inputfield"
                          type="country"
                          name="country"
                          placeholder="Country"
                        />
                        <ErrorMessage name="country" component="div" />
                        <Field
                          data-cy="zipcode"
                          className="inputfield"
                          type="zipcode"
                          name="zipcode"
                          placeholder="Zip Code"
                        />
                        <ErrorMessage name="zipcode" component="div" />
                        <Field
                          data-cy="email"
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
                          data-cy="cardholder"
                          className="inputfield"
                          type="cardholder"
                          name="cardholder"
                          placeholder="Cardholder"
                        />
                        <ErrorMessage name="cardholder" component="div" />
                        <Field
                          data-cy="cardnumber"
                          className="inputfield"
                          type="cardnumber"
                          name="cardnumber"
                          placeholder="Card Number"
                        />
                        <ErrorMessage name="cardnumber" component="div" />
                        <div style={cardExpireInfo}>
                          <div>
                            <Field
                              data-cy="mm"
                              className="inputfield"
                              type="mm"
                              name="mm"
                              placeholder="MM"
                              maxLength="2"
                              margin="0 8px 0 0"
                            />
                            <ErrorMessage name="mm" component="div" />
                          </div>
                          <div>
                            <Field
                              data-cy="yy"
                              className="inputfield"
                              type="yy"
                              name="yy"
                              maxLength="2"
                              placeholder="YY"
                            />
                            <ErrorMessage name="yy" component="div" />
                          </div>
                        </div>
                        <Field
                          data-cy="securitynumber"
                          className="inputfield"
                          type="securitynumber"
                          name="securitynumber"
                          maxLength="4"
                          placeholder="Security Number"
                        />
                        <ErrorMessage name="securitynumber" component="div" />
                        <Link href="/thankYouPage">
                          <a
                            data-cy="go-to-thank-you-page"
                            style={submitButtonStyles}
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Place Your Order
                          </a>
                        </Link>
                        <div>
                          <div style={buttonBorderStyles}>
                            <div style={subtotalButtonStyles}>
                              <b data-cy="checkout-button">Subtotal:</b>
                              <div>{centsToDollars(subTotal)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getBooks } = await import('../util/database');

  const books = await getBooks();
  const props = {};
  if (books) props.books = books;

  return {
    props: { props },
  };
}
