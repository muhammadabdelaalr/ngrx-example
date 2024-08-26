import { createAction, props } from "@ngrx/store";
import { Category } from "../../core/interface/interface";

export const loadCategories = createAction(
  '[Categories] Load Categories', props<{ categories: Category[] }>()
)
