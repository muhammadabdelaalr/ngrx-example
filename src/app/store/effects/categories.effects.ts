import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as categoriesActions from "../actions/categories.action"
import { map, mergeMap } from "rxjs";
import { ApisService } from "../../core/services/apis.service";

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.loadCategories),
      mergeMap(() =>
        this.api.getCategories().pipe(
          map((categories) => categoriesActions.setCategories({ categories })),
        )
      )
    )
  )

  constructor(private actions$: Actions, private api: ApisService) { }
}
