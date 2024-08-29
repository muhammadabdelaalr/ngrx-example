import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interface/interface';
import { Product } from '../../modules/products/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  baseUrl = 'http://localhost:3000/';

  http = inject(HttpClient);
  
  constructor() { }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}categories`);
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}products`);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(`${this.baseUrl}products`, product);
  }

  editProduct(id: string, product: Product) {
    return this.http.put<Product>(`${this.baseUrl}products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.baseUrl}products/${id}`);
  }
}
