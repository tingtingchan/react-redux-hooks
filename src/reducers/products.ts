import { combineReducers } from "redux";

import { RECEIVE_PRODUCTS, FILTER_BY_SIZE, ADD_TO_CART } from "../constants/ActionTypes";

type Actions =
  | { type: "RECEIVE_PRODUCTS"; products: Array<Product> }
  | { type: "FILTER_BY_SIZE"; size: string }
  | { type: "ADD_TO_CART"; addedProductId: number };

export type ProductsReducer = {
  products: Products;
  byId: ProductById;
  visibleIds: number[];
  filteredSize: string;
};

type Products = Product[]

export interface Product {
  id: number;
  sku: number;
  title: string;
  description: string;
  availableSizes: Array<string>;
  price: number;
  inventory: number;
  isFreeShipping: boolean;
}

export interface ProductById {
  [key: number]: Product;
}

const products = (state: Products = [], action: Actions): Product[] => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

const decrementInventory = (state: Product): Product => {
  return {
    ...state,
    inventory: state.inventory - 1
  }
}


const byId = (state: ProductById = {}, action: Actions) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce<ProductById>((obj, product) => {
          obj[product.id] = product;
          return obj;
        }, {})
      };

    case ADD_TO_CART:
      const { addedProductId } = action
      return {
        ...state,
        [addedProductId]: decrementInventory(state[addedProductId])
      };

    default:
      return state;
  }
};

const visibleIds = (state: Array<number> = [], action: Actions) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id);

    default:
      return state;
  }
};

const filteredSize = (state: string = "All", action: Actions) => {
  switch (action.type) {
    case FILTER_BY_SIZE:
      return action.size;

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
