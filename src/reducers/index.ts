import { combineReducers } from "redux";

import { productsReducer } from "./products";
import { cartReducer } from "./cart";

export const rootReducer = combineReducers({
  productsReducer,
  cartReducer
});
