import { createSelector } from "reselect";

const productsSelector = state => state.productsReducer.products;
const byIdSelector = state => state.productsReducer.byId;
const visibleIdsSelector = state => state.productsReducer.visibleIds;
const filteredSizeSelector = state => state.productsReducer.filteredSize;

export const getSizeRangeList = createSelector(productsSelector, products => {
  return products.reduce((acc, currProduct) => {
    return [...new Set([...acc, ...currProduct.availableSizes])];
  }, []);
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
  (filteredSize, visibleProducts, filteredVisibleProducts) =>
    filteredSize ? filteredVisibleProducts : visibleProducts
);
