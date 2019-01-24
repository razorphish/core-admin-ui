import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpService {
    constructor(
        private authHttp: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }

    delete(endpoint: string, options?: any): Observable<any> {
        if (this.authService.tokenRequiresRefresh()) {
            this.authService.tokenIsBeingRefreshed.next(true);
            return this.authService
                .refreshToken()
                .pipe(switchMap(data => {
                    this.authService.refreshTokenSuccessHandler(data);
                    if (!!data) {
                        return this.deleteInternal(endpoint);
                    } else {
                        this.router.navigate(['/auth/login']);
                        return throwError(data);
                    }
                }),
                    catchError(e => {
                        this.authService.refreshTokenErrorHandler(e);
                        return throwError(e);
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
                    if (!!data) {
                        return this.getInternal(endpoint);
                    } else {
                        this.router.navigate(['/auth/login']);
                        return throwError(data);
                    }
                }),
                    catchError(e => {
                        this.authService.refreshTokenErrorHandler(e);
                        return throwError(e);
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
                    if (!!data) {
                        return this.postInternal(endpoint, body);
                    } else {
                        this.router.navigate(['/auth/login']);
                        return throwError(data);
                    }
                }),
                    catchError(e => {
                        this.authService.refreshTokenErrorHandler(e);
                        return throwError(e);
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
                    if (!!data) {
                        return this.putInternal(endpoint, body);
                    } else {
                        this.router.navigate(['/auth/login']);
                        return throwError(data);
                    }
                }),
                    catchError(e => {
                        this.authService.refreshTokenErrorHandler(e);
                        return throwError(e);
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
