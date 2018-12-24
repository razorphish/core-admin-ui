import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHttp } from '../../../shared/auth/ng2-bearer';
import { AuthoritiesService } from './authorities.service';

import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthHttpService {
  constructor(
    private authHttp: AuthHttp,
    private authService: AuthoritiesService,
    private router: Router
  ) { }

  delete(endpoint: string, options?: any): Observable<any> {
    if (this.authService.tokenRequiresRefresh()) {
      this.authService.tokenIsBeingRefreshed.next(true);
      return this.authService
        .refreshToken()
        .pipe(switchMap(data => {
          this.authService.refreshTokenSuccessHandler(data);
          if (this.authService.loggedIn()) {
            this.authService.tokenIsBeingRefreshed.next(false);
            return this.deleteInternal(endpoint);
          } else {
            this.authService.tokenIsBeingRefreshed.next(false);
            this.router.navigate(['/auth/login']);
            return Observable.throw(data);
          }
        }),
          catchError(e => {
            this.authService.refreshTokenErrorHandler(e);
            return Observable.throw(e);
          }));
    } else {
      return this.deleteInternal(endpoint, options);
    }
  }

  get(endpoint: string, options?: any) {
    if (this.authService.tokenRequiresRefresh()) {
      this.authService.tokenIsBeingRefreshed.next(true);
      return this.authService
        .refreshToken()
        .pipe(switchMap(data => {
          this.authService.refreshTokenSuccessHandler(data);
          if (this.authService.loggedIn()) {
            this.authService.tokenIsBeingRefreshed.next(false);
            return this.getInternal(endpoint);
          } else {
            this.authService.tokenIsBeingRefreshed.next(false);
            this.router.navigate(['/auth/login']);
            return Observable.throw(data);
          }
        }),
          catchError(e => {
            this.authService.refreshTokenErrorHandler(e);
            return Observable.throw(e);
          }));
    } else {
      return this.getInternal(endpoint, options);
    }
  }

  post(endpoint: string, body: string, options?: any): Observable<any> {
    if (this.authService.tokenRequiresRefresh()) {
      this.authService.tokenIsBeingRefreshed.next(true);
      return this.authService
        .refreshToken()
        .pipe(switchMap(data => {
          this.authService.refreshTokenSuccessHandler(data);
          if (this.authService.loggedIn()) {
            this.authService.tokenIsBeingRefreshed.next(false);
            return this.postInternal(endpoint, body);
          } else {
            this.authService.tokenIsBeingRefreshed.next(false);
            this.router.navigate(['/auth/login']);
            return Observable.throw(data);
          }
        }),
          catchError(e => {
            this.authService.refreshTokenErrorHandler(e);
            return Observable.throw(e);
          }));
    } else {
      return this.postInternal(endpoint, body, options);
    }
  }

  put(endpoint: string, body: string, options?: any): Observable<any> {
    if (this.authService.tokenRequiresRefresh()) {
      this.authService.tokenIsBeingRefreshed.next(true);
      return this.authService
        .refreshToken()
        .pipe(switchMap(data => {
          this.authService.refreshTokenSuccessHandler(data);
          if (this.authService.loggedIn()) {
            this.authService.tokenIsBeingRefreshed.next(false);
            return this.putInternal(endpoint, body);
          } else {
            this.authService.tokenIsBeingRefreshed.next(false);
            this.router.navigate(['/auth/login']);
            return Observable.throw(data);
          }
        }),
          catchError(e => {
            this.authService.refreshTokenErrorHandler(e);
            return Observable.throw(e);
          }));
    } else {
      return this.putInternal(endpoint, body, options);
    }
  }

  private getInternal(endpoint: string, options?: any) {
    const opts = options || { withCredentials: true };
    return this.authHttp.get(endpoint, opts);
  }

  private postInternal(endpoint: string, body: string, options?: any) {
    const opts = options || { withCredentials: true };
    return this.authHttp.post(endpoint, body, opts);
  }

  private putInternal(endpoint: string, body, options?: any) {
    const opts = options || { withCredentials: true };
    return this.authHttp.put(endpoint, body, opts);
  }

  private deleteInternal(endpoint: string, options?: any) {
    const opts = options || { withCredentials: true };
    return this.authHttp.delete(endpoint, opts);
  }
}
