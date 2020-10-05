import Link from 'next/link';
import Layout from '../components/Layout';

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '20px',
};

const itemBorder = {
  border: 'solid',
  borderColor: '#000',
  borderRadius: '20px',
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
  justifyContent: 'center',
  alignContent: 'center',
  border: 'solid',
  borderRadius: '15px',
  borderColor: '#000',
  maxHeight: '400px',
  maxWidth: '200px',
  padding: '80px 80px 80px',
  marginRight: '30px',
};

const purchaseButtonStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '30px 50px',
  borderRadius: '15px',
};

export default function confirmAddToCart() {
  return (
    <>
      <Layout>
        <h1>Your Cart</h1>
        <div style={containerStyles}>
          <div style={itemBorder}>
            <div style={itemInfoStyles}>
              <div style={quatityStyles}>
                <div>Quantity: </div>
                <select>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div>
                <button style={removeItemStyles}>Remove Item</button>
              </div>
            </div>
          </div>
          <div style={buttonBorderStyles}>
            <button style={purchaseButtonStyles}>
              <a>Purchase</a>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
