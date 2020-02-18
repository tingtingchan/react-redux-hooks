import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ADD_TO_CART,
  RECEIVE_PRODUCTS,
  FILTER_BY_SIZE
} from "../constants/ActionTypes";

import { FilterBySize } from "../components/FilterBySize";
// import ProductItem from "../components/ProductItem";

import { getSizeRangeList, getRenderedProducts } from "../selectors";
import { Product } from "../reducers/products";

const url = "http://localhost:8000/products";

export const ProductsContainer: React.FC = () => {
  const sizeRangeList: Array<string> = useSelector(getSizeRangeList);
  const renderedProducts: Array<Product> = useSelector(getRenderedProducts);

  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error("error fetching!!!");
        }
        return res.json();
      })
      .then(data => {
        // setProducts(data);
        dispatch({ type: RECEIVE_PRODUCTS, payload: data });
      });
  }, [dispatch]);

  return (
    <div>
      <h2>Product List</h2>
      <hr />
      <FilterBySize
        sizeRange={sizeRangeList}
        handleSizeChange={e =>
          dispatch({ type: FILTER_BY_SIZE, payload: e.target.value })
        }
      />
      <hr />
      {renderedProducts.map(product => (
        <div key={product.id}>
          <div>
            <a href={`#${product.id}`}>
              <img src={`products/${product.sku}_2.jpg`} alt={product.title} />
            </a>
            <div>
              <p>{product.title}</p>
              <b>{product.price}</b> | <b>{product.inventory} left</b>
              <p>{product.availableSizes.join(", ")}</p>
            </div>
            <button
              onClick={() => dispatch({ type: ADD_TO_CART, payload: product })}
            >
              {!product.inventory ? "Sold Out" : "Add to cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
