import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

const sharedSwal = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(map((event) => {
    if (event instanceof HttpResponse) {

      const body = event.body as any;
      if (
        body &&
        (req.method === 'POST' ||
          req.method === 'PUT' ||
          req.method === 'DELETE')
      ) {
        if (body) {
          sharedSwal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Success!',
          })
        } else {
          // Show each error in the errors array as a separate toaster
          if (body.errors && body.errors.length > 0) {
            body.errors.forEach((error: any) => {
              sharedSwal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
              })
            });
          } else {
            sharedSwal.fire({
              icon: 'error',
              title: 'Error!',
              text: "something went wrong",
            })
          }
        }
      }
    }
    return event;
  }),
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          sharedSwal.fire({
            icon: 'warning',
            title: 'Unauthorized',
            text: "Please login again. If you are still logged in, please refresh the page",
          })
          break;
        case 403:
          sharedSwal.fire({
            icon: 'error',
            title: 'Forbidden',
            text: "You are not authorized to perform this action",
          })
          break;
        case 404:
          sharedSwal.fire({
            icon: 'error',
            title: 'Not found',
            text: "The page you are looking for does not exist or has been removed",
          })
          break;
        case 406:
          sharedSwal.fire({
            icon: 'error',
            title: 'Not acceptable',
            text: "The server cannot respond to this request because the content type is not acceptable",
          })
          break;
        case 500:
          sharedSwal.fire({
            icon: 'error',
            title: 'Internal server error',
            text: "Please contact the administrator. Error message: " + error.message,
          })
          break;
        default:
          sharedSwal.fire({
            icon: 'error',
            title: 'Error',
            text: "something went wrong",
          })
          break;
      }
      return throwError(error);
    })
  );
};

