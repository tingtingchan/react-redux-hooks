import React from "react";
import { Product } from "../reducers/products";

interface Props {
  item: Product;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  return (
    <li>
      {item.description}
      <input placeholder={item.inventory.toString()}></input>
    </li>
  );
};
