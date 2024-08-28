import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = {
    'authorization': 'Bearer 123',
    'lang': 'en'
  }

  const isLocalReq = req.url.includes('localhost');

  const modifiedReq = isLocalReq ? req : req.clone({ setHeaders: headers });

  return next(modifiedReq);
};
