import { createReducer, on } from "@ngrx/store";
import * as productsActions from './products.action';
import { Product } from "../interfaces/products.interface";

export const initialState: any = {
  products: [],
};

export const productsReducer = createReducer(initialState,
  on(productsActions.setProducts, (state, { products }) => ({
    ...state,
    products,
  })),
  on(productsActions.addProduct, (state, action) => {
    state = {
      ...state,
      products: [...state.products, action.product]
    };
    return state;
  }),
  on(productsActions.selectProductForEdit, (state, { product }) => {
    return {
      ...state,
      selectedProduct: product,
      isEdit : true,
    };
  }),
  on(productsActions.editProduct, (state, { product }) => {
    const products = state.products.map((p: Product) => p.id === product.id ? product : p);
    state = {
      ...state,
      products,
    }
    return state;
  }),
  on(productsActions.deleteProduct, (state, { id }) => {
    const products = [...state.products];
    const index = products.findIndex((p: Product) => p.id === id);
    products.splice(index, 1);
    state = {
      ...state,
      products: products
    }
    return state;
  }
  ))

