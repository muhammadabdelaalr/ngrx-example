import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApisService } from '../../core/services/apis.service';
import * as productsActions from '../actions/products.action';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProducts),
      mergeMap(() =>
        this.api.getProducts().pipe(
          map((products) => productsActions.setProducts({ products }))
        )
      ),
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.addProduct),
      mergeMap(action =>
        this.api.addProduct(action.product).pipe(
          map(() => productsActions.loadProducts())
        )
      )
    ))

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.editProduct),
      mergeMap(action =>
        this.api.editProduct(action.product.id ?? '', action.product).pipe(
          map(() => productsActions.loadProducts())
        )
      )
    ))

  deleteProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.deleteProduct),
      mergeMap(action =>
        this.api.deleteProduct(action.id).pipe(
          map(() => productsActions.loadProducts())
        )
      )
    ))


  constructor(private actions$: Actions, private api: ApisService) { }
}
