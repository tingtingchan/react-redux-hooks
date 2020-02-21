import { combineReducers } from "redux";

import { ADD_TO_CART } from './../constants/ActionTypes';


type Actions =
  | { type: "ADD_TO_CART"; addedProductId: number };

export type CartReducer = {
  addedIds: Array<number>;
  quantityById: QuantityByCartItemId
};

export interface QuantityByCartItemId {
  [key: number]: number;
}

const addedIds = (state = [], action: Actions) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...new Set([...state,
      action.addedProductId])]
    default:
      return state;
  }
}

const quantityById = (state = {}, action: Actions) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [action.addedProductId]: incrementQuantity(state, action.addedProductId)
      }
    default:
      return state;
  }
}

const incrementQuantity = (state: QuantityByCartItemId, id: number) => {
  if (state.hasOwnProperty(id)) {
    return state[id] + 1
  } else {
    return 1
  }
}

export const cartReducer = combineReducers({
  addedIds,
  quantityById
});
