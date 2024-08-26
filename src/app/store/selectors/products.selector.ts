import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectProductState = createFeatureSelector<AppState>('products');
export const selectProduct = createSelector(
  selectProductState,
  (state) => state.products
);
