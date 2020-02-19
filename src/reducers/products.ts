import { combineReducers } from "redux";

import { RECEIVE_PRODUCTS, FILTER_BY_SIZE } from "../constants/ActionTypes";

type Actions =
  | { type: "RECEIVE_PRODUCTS"; products: Array<Product> }
  | { type: "FILTER_BY_SIZE"; size: string };

export type ProductsReducer = {
  products: Product[];
  byId: ProductById;
  visibleIds: number[];
  filteredSize: string;
};

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

// type State = Product[]

const products = (state: Product[] = [], action: Actions) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products;

    default:
      return state;
  }
};

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

    default:
      // TODO: based on products to key off by id
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

const filteredSize = (state: string = "", action: Actions) => {
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
