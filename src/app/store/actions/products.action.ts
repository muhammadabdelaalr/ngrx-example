import { createAction, props } from "@ngrx/store";
import { Product } from "../../core/interface/interface";

export const loadProducts = createAction(
  '[Products] Load Products'
);

export const setProducts = createAction(
  '[Products] set Products', props<{ products: Product[] }>()
);

export const addProduct = createAction(
  '[Products] Add Product', props<{ product: Product }>()
)

export const editProduct = createAction(
  '[Products] Edit Product', (product: Product) => ({ product })
)

export const deleteProduct = createAction(
  '[Products] Delete Product', (id: string) => ({ id })
)

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure', props<{ error: string }>()
);
