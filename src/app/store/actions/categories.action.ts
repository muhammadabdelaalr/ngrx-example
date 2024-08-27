import { createAction, props } from "@ngrx/store";
import { Category } from "../../core/interface/interface";

export const loadCategories = createAction(
  '[Categories] Load Categories'
)

export const setCategories = createAction(
  '[Categories] Set Categories', props<{ categories: Category[] }>()
)
