import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

import { environment } from '@env/environment';
import { Store } from '@ngrx/store';

import * as fromAuth from '../store/auth';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    public authToken: AuthTokenService,
    public store: Store<fromAuth.AuthState>
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.url.search(environment.apiUrl + 'auth/logout') === 0) {
      //console.log('interceptedlog');
      return this.handleLogout(request, next);

    } else if (request.url.search(environment.apiUrl + 'auth/register-with-email-password') === 0 ||
      request.url.search(environment.apiUrl + 'auth/reset-password')) {
      return next.handle(request);

    } else if (request.url.search(environment.apiUrl) === 0) {
      //console.log('intercepted', request.url);
      // attach token
      return this.handleApiRequest(request, next);
    } else {
      //console.log('not intercepted', request.url)
      return next.handle(request);
    }
  }

  handleApiRequest(request: HttpRequest<any>, next: HttpHandler) {

    request = this.authToken.token
      ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authToken.token.access_token}`,
          'Content-Type': 'application/json'
        }
      })
      : request;

    const handler = next
      .handle(request)
      .pipe(
        catchError((error, caught) => {
          if (error.status === 401 || error.status === 403) {
            this.store.dispatch(new fromAuth.LogoutAction());
            return throwError(error);
          } else {
            return throwError(error);
          }
        })
      );

    return handler;
  }

  /**
   * 
   * @param request HttpRequest<any>
   * @param next next: HttpHandler
   */
  handleLogout(request: HttpRequest<any>, next: HttpHandler) {

    const user = this.authToken.token.user ?
      {
        user: {
          _id: this.authToken.token.user._id
        }
      } :
      { user: { _id: '' } }

    request = this.authToken.token.user._id
      ? request.clone({
        body: { ...request.body, ...user }
      })
      : request;

    const handler = next
      .handle(request)
      .pipe(
        catchError((error, caught) => {
          if (error.status === 401 || error.status === 403) {
            this.store.dispatch(new fromAuth.LogoutAction());
            return throwError(error);
          } else {
            return throwError(error);
          }
        })
      );

    return handler;
  }
}
