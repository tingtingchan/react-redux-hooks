
import { createSelector } from "reselect";

import { CartReducer } from "../reducers/cart";
import { ProductsReducer } from "../reducers/products";

type State = {
  productsReducer: ProductsReducer;
  cartReducer: CartReducer;
};

const byIdSelector = (state: State) => state.productsReducer.byId;
const addedIdsSelector = (state: State) => state.cartReducer.addedIds;
const quantityByIdSelector = (state: State) => state.cartReducer.quantityById;

export const getCartItems = createSelector(
  [byIdSelector, addedIdsSelector, quantityByIdSelector],
  (byId, addedIds, quantityById) => {
    const addedProducts = addedIds.map(id => byId[id])

    return addedProducts.map(product => {
      return { ...product, inventory: quantityById[product.id] }
    })
  }
);