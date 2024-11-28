import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token'); // Suponiendo que almacenas el token en localStorage

    let clonedReq = req;

    if (authToken) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error
          console.error(`Server-side error: ${error.status} ${error.message}`);
          if (error.status === 0) {
            // Handle the case of self-signed certificates
            console.error('Self-signed certificate error');
          }
        }
        return throwError(() => new Error('Algo salió mal; por favor intenta nuevamente más tarde.'));
      })
    );
  }
}
