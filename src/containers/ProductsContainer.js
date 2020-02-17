import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { ADD_TO_CART, RECEIVE_PRODUCTS } from "../constants/ActionTypes";

// import ProductList from "../components/ProductList";
// import ProductItem from "../components/ProductItem";

const url = "http://localhost:8000/products";

export function ProductsContainer() {
  const byId = useSelector(state => state.productsReducer.byId);

  const visibleIdsSelector = state => state.productsReducer.visibleIds;
  const getVisibleProducts = createSelector(visibleIdsSelector, visibleIds =>
    visibleIds.map(id => byId[id])
  );

  const visibleProducts = useSelector(getVisibleProducts);

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
      {visibleProducts.map(product => (
        <div key={product.id}>
          <div>
            <a href={`#${product.id}`}>
              <img src={`products/${product.sku}_2.jpg`} alt={product.title} />
            </a>
            <div>
              <p>{product.title}</p>
              <b>{product.price}</b> | <b>{product.inventory} left</b>
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
}
