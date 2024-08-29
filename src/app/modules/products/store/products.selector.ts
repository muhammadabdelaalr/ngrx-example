import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productsState } from "./products.state";

export const selectProductState = createFeatureSelector<productsState>('productsState');

export const selectProduct = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectIsEdit = createSelector(
  selectProductState,
  (state) => state.isEdit
)

export const SelectedProductSelector = createSelector(
  selectProductState,
  (state) => state.selectedProduct
)
