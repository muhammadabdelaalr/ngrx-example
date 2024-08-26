import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectCategoriesState = createFeatureSelector<AppState>('categories');
export const selectCategories = createSelector(
  selectCategoriesState,
  (state) => state.categories
);
