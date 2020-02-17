import React from "react";
import { useSelector } from "react-redux";

export function CartContainer() {
  // const [quantity, setQuantity] = useState("Albus Dumbledore");

  // TODO: useSelector/createSelector to get unavailableProducts
  // based on availableProducts -> extra transformations from the Redux Store State
  // to get unavailableProducts

  // make a pure function so anywhere can use this unavailableProducts

  const unavailableProducts = useSelector(state => ({
    ...state.productsReducer
  }));

  // function handleQuantityChange(e) {
  //   setQuantity(e.target.value);
  // }

  return (
    <div>
      <h2>Shopping Cart ({unavailableProducts.length})</h2>
      <hr />
      {unavailableProducts.map(product => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>
            {product.price} x {product.inventory}
          </p>
          {/* <input type="number" value={quantity} onChange={handleQuantityChange} /> */}
        </div>
      ))}
    </div>
  );
}
