import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize, switchMap, timer } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingSer = inject(LoadingService);

  loadingSer.showLoading();

  return timer(3000).pipe(
    switchMap(() => next(req)),
    finalize(() => loadingSer.hideLoading())
  )
};
