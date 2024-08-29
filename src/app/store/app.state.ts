import { ActionReducerMap } from "@ngrx/store";
import { counterReducer } from "./reducers/counter.reducer";
import { Category } from "../core/interface/interface";
import { productsReducer } from "../modules/products/store/products.reducer";
import { categoriesReducer } from "./reducers/categories.reducer";
import { productsState } from "../modules/products/store/products.state";

export interface AppState {
  counter: number;
  categories: Category[];
  productsState: productsState;
}

export const appState: ActionReducerMap<AppState> = {
  counter: counterReducer,
  productsState: productsReducer,
  categories: categoriesReducer,
};
