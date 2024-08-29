import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../modules/shared/services/loading.service';
import { finalize, switchMap, timer } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const isMethodGet: boolean = req.method === 'GET';

  const loadingSer = inject(LoadingService);
  if(!isMethodGet) {
    return next(req);
  } else {
    loadingSer.showLoading();

    return timer(3000).pipe(
      switchMap(() => next(req)),
      finalize(() => loadingSer.hideLoading())
    )
  }
};
