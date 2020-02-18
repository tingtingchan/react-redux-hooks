import { combineReducers } from "redux";

import { RECEIVE_PRODUCTS, FILTER_BY_SIZE } from "../constants/ActionTypes";

const products = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.payload;

    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.payload.reduce((obj, product) => {
          obj[product.id] = product;
          return obj;
        }, {})
      };

    default:
      // TODO: based on products to key off by id
      return state;
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.payload.map(product => product.id);

    default:
      return state;
  }
};

const filteredSize = (state = null, action) => {
  switch (action.type) {
    case FILTER_BY_SIZE:
      return action.payload;

    default:
      return state;
  }
};

export const productsReducer = combineReducers({
  products,
  byId,
  visibleIds,
  filteredSize
});
