import React from "react";
import { useSelector } from "react-redux";

import { getCartItems } from "../selectors/cart";
import { Product } from "../reducers/products";
import { CartItemList } from "../components/CartItemList";

export const CartContainer: React.FC = () => {
  const cartItems: Array<Product> = useSelector(getCartItems);

  return (
    <div>
      <h2>Cart List</h2>
      <hr />
      <CartItemList cartItems={cartItems} />
    </div>
  );
};
