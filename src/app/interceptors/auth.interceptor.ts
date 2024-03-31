import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { IToken } from '../common/IToken';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.accessToken()) {
      request = this.setToken(request, this.authService.accessToken());
    }

    return next.handle(request).pipe(
      catchError(error => {
        const refreshToken = this.authService.refreshToken();
        if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('refresh') && refreshToken) {
          return this.handleAuthorizationError(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private setToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handleAuthorizationError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('using refresh token!');

     // I have created a route on my back-end to generate a new access token
      return this.authService.getRefreshToken().pipe(
        switchMap((response: IToken) => {
          console.log('refresh token used');

          return next.handle(this.setToken(request, response.accessToken));
        })
      );
  }
}