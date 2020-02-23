import React from "react";
import { useSelector } from "react-redux";

import { getCartItems } from "../selectors/cart";
import { Product } from "../reducers/products";

export const CartContainer: React.FC = () => {
  const cartitems: Array<Product> = useSelector(getCartItems);

  console.log(cartitems);
  return (
    <div>
      <h2>Cart List</h2>
      <hr />
      {cartitems.map(item => (
        <>
          <p>{item.description}</p>
          <input placeholder={item.inventory.toString()}></input>
        </>
      ))}
    </div>
  );
};
