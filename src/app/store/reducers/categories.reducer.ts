import { createReducer, on } from "@ngrx/store";
import * as categoriesActions from '../actions/categories.action';


export const initialState: any = {
  categories: [],
};

export const categoriesReducer = createReducer(initialState,
  on(categoriesActions.setCategories, (state, {categories}) => ({...state, categories})),
)
