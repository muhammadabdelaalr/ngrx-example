import { ActionReducerMap } from "@ngrx/store";
import { counterReducer } from "./reducers/counter.reducer";
import { Category, Product } from "../core/interface/interface";
import { productsReducer } from "./reducers/products.reducer";
import { categoriesReducer } from "./reducers/categories.reducer";

export interface AppState {
  counter: number;
  categories: Category[];
  products: Product[];
}

export const appState: ActionReducerMap<AppState> = {
  counter: counterReducer,
  products: productsReducer,
  categories: categoriesReducer,
};
