import { createSelector } from "reselect";

import { ProductsReducer } from "./../reducers/products";

type State = {
  productsReducer: ProductsReducer;
};

const productsSelector = (state: State) => state.productsReducer.products;
const byIdSelector = (state: State) => state.productsReducer.byId;
const visibleIdsSelector = (state: State) => state.productsReducer.visibleIds;
const filteredSizeSelector = (state: State) =>
  state.productsReducer.filteredSize;

export const getSizeRangeList = createSelector(productsSelector, products => {
  return products.reduce<string[]>(
    (acc, currProduct) => {
      return [...new Set([...acc, ...currProduct.availableSizes])];
    },
    ["All"]
  );
});

export const getVisibleProducts = createSelector(
  [byIdSelector, visibleIdsSelector],
  (byId, visibleIds) => {
    return visibleIds.map(id => byId[id]);
  }
);

export const getFilteredVisibleProducts = createSelector(
  [filteredSizeSelector, getVisibleProducts],
  (filteredSize, visibleProducts) => {
    return visibleProducts.filter(product =>
      product.availableSizes.includes(filteredSize)
    );
  }
);

export const getRenderedProducts = createSelector(
  [filteredSizeSelector, getVisibleProducts, getFilteredVisibleProducts],
  (filteredSize, visibleProducts, filteredVisibleProducts) => {
    if (filteredSize === "All") {
      return visibleProducts;
    } else {
      return filteredVisibleProducts;
    }
  }
);
