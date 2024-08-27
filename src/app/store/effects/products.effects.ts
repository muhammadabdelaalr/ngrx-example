import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { ApisService } from '../../core/apis.service';
import * as productsActions from '../actions/products.action';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProducts),
      mergeMap(() =>
        this.api.getProducts().pipe(
          map((products) => productsActions.setProducts({ products })),
          // catchError((error) => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApisService) { }
}
