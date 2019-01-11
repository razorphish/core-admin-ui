
import { Injectable } from '@angular/core';
import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Request,
    Response,
    Headers
} from '@angular/http';
import { Router } from '@angular/router';

import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import * as _ from 'lodash';

import { AuthService } from '../core/services/auth.service';

@Injectable()
export class HttpInterceptor extends Http {
    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private _router: Router,
        private _authService: AuthService
    ) {
        super(backend, defaultOptions);
    }

    request(
        url: string | Request,
        options?: RequestOptionsArgs
    ): Observable<Response> {
        // return super.request(url, options);
        return this.intercept(super.request(url, options), null);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        // return super.get(url, this.getRequestOptionArgs(options));
        return this.intercept(super.get(url, options), null);
    }

    post(
        url: string,
        body: string,
        options?: RequestOptionsArgs
    ): Observable<Response> {
        return this.intercept(
            super.post(url, body, this.getRequestOptionArgs(options)),
            body
        );
        // return this.post(url, body, this.getRequestOptionArgs(options));
    }

    put(
        url: string,
        body: string,
        options?: RequestOptionsArgs
    ): Observable<Response> {
        // return this.intercept(
        //   super.put(url, body, this.getRequestOptionArgs(options)),
        //   body
        // );
        return this.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        // return this.intercept(super.delete(url, this.getRequestOptionArgs(options)), null);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions({ withCredentials: true });
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    intercept(observable: Observable<Response>, body: any): Observable<Response> {
        return observable
            .pipe(catchError((err, source) => {
                if (err.status === 401 && !_.endsWith(err.url, 'oauth/token')) {
                    this._router.navigate(['/auth/login']);
                    return EMPTY;
                } else {
                    return Observable.throw(err);
                }
            }),
                tap((response: Response) => {
                    this.onSuccess(response);
                }));
    }

    private onSuccess(res: Response): void {
        // console.log(res);
    }
}
