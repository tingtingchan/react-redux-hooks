import React from "react";
import { Product } from "../reducers/products";

interface Props {
  product: Product;
  onAddToCartClicked: () => void;
}

export const ProductItem: React.FC<Props> = ({
  product,
  onAddToCartClicked
}) => {
  return (
    <li>
      <a href={`#${product.id}`}>
        <img src={`products/${product.sku}_2.jpg`} alt={product.title} />
      </a>
      <div>
        <p>{product.title}</p>
        <b>{product.price}</b> | <b>{product.inventory} left</b>
        <p>{product.availableSizes.join(", ")}</p>
      </div>
      <button onClick={onAddToCartClicked}>
        {!product.inventory ? "Sold Out" : "Add to cart"}
      </button>
    </li>
  );
};
