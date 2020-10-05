import Link from 'next/link';

export default function AddToCart() {
  const addToCartStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    padding: '15px 40px',
    border: 'solid',
    borderRadius: '15px',
    borderColor: '#000',
    borderWidth: '3px',
    margin: '0',
  };

  const addButtonStyles = {
    padding: '10px 20px',
    backgroundColor: '#5963DE',
    color: '#fff',
    borderRadius: '15px',
  };
  return (
    <>
      <div style={addToCartStyles}>
        <p>Price: </p>
        {/* In Stock will eventually be a property */}
        <p>In Stock</p>
        <div>
          <div>Quantity:</div>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <button style={addButtonStyles}>
          <Link href="/checkout/confirmAddToCart">
            <a>Add To Cart</a>
          </Link>
        </button>
      </div>
    </>
  );
}
