import _ from "lodash";
import { combineReducers } from "redux";

import { RECEIVE_PRODUCTS, ADD_TO_CART } from "../constants/ActionTypes";

const initialState = {
  products: [],
  availableProducts: [],
  byId: {},
  visibleIds: []
};

// export function productsReducer(state = initialState, action) {
//   switch (action.type) {
//     // case RECEIVE_PRODUCTS:
//     //   return {
//     //     ...state,
//     //     products: [...action.payload],
//     //     availableProducts: [...action.payload]
//     //   };
//     case ADD_TO_CART:
//       const productId = action.payload.id;
//       const updatedProduct = {
//         ...action.payload,
//         inventory: action.payload.inventory - 1
//       };
//       const productIdx = _.findIndex(
//         state.availableProducts,
//         product => product.id === productId
//       );

//       return {
//         ...state,
//         availableProducts: [
//           ...state.availableProducts.slice(0, productIdx),
//           updatedProduct,
//           ...state.availableProducts.slice(productIdx + 1)
//         ]
//       };
//     default:
//       return state;
//   }
// }

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

export const productsReducer = combineReducers({
  byId,
  visibleIds
});

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id));
