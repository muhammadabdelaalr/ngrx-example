import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApisService } from '../../core/apis.service';
import { loadProducts } from '../actions/products.action';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.api.getProducts().pipe(
          map((products) => loadProducts({ products })),
          // catchError((error) => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApisService) {}
}
