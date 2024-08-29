import { Product } from "../interfaces/products.interface";

export interface productsState {
  products: Product[],
  isEdit: boolean,
  selectedProduct : Product,
};
