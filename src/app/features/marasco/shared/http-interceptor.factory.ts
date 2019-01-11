import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { HttpInterceptor } from './http-interceptor';
import { AuthService } from '../core/services/auth.service';

export function HttpInterceptorFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  router: Router,
  authService: AuthService
): Http {
  return new HttpInterceptor(xhrBackend, requestOptions, router, authService);
}
