import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ADD_TO_CART,
  RECEIVE_PRODUCTS,
  FILTER_BY_SIZE
} from "../constants/ActionTypes";

import { FilterBySize } from "../components/FilterBySize";
import { ProductsList } from "../components/ProductsList";
import { getSizeRangeList, getRenderedProducts } from "../selectors/products";
import { Product } from "../reducers/products";
import { ProductItem } from "../components/ProductItem";

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
        dispatch({ type: RECEIVE_PRODUCTS, products: data });
      });
  }, [dispatch]);

  return (
    <div>
      <h2>Product List</h2>
      <hr />
      <p>{renderedProducts.length} products found.</p>
      <FilterBySize
        sizeRange={sizeRangeList}
        handleSizeChange={e =>
          dispatch({ type: FILTER_BY_SIZE, size: e.target.value })
        }
      />
      <hr />
      <ProductsList>
        {renderedProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() =>
              dispatch({
                type: ADD_TO_CART,
                addedProductId: product.id
              })
            }
          />
        ))}
      </ProductsList>
    </div>
  );
};
