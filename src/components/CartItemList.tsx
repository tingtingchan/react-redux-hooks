import React from "react";
import { Product } from "../reducers/products";

import { CartItem } from "./CartItem";

interface Props {
  cartItems: Array<Product>;
}

export const CartItemList: React.FC<Props> = ({ cartItems }) => {
  return (
    <ul>
      {cartItems.map(item => (
        <CartItem item={item} />
      ))}
    </ul>
  );
};
