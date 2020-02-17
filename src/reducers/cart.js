// import { ADD_TO_CART } from "../constants/ActionTypes";

const initialState = {
  cartItems: []
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    // case ADD_TO_CART:
    //   return {
    //     ...state,
    //     cartItems: [...state.cartItems, action.payload]
    //   };
    //     case UPDATE_CART_ITEM_QUANTITY:
    //       const
    //       return {
    // ...state,

    //       }
    //     case REMOVE_CART_ITEM:
    //       const cartItemId = action.payload
    //       return {
    //         ...state,
    //         cartItems: _.reject(state.cartItems, cartItem => cartItem.id === cartItemId)

    //         // add the quantity back to the products list --
    //       }
    default:
      return state;
  }
}
