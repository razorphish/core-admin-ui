import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '@app/features/marasco/core/services/notification.service';

@Injectable()
export class ResetGuard implements CanActivate {

  loginUrl: string = environment.loginUrl;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _notificationService: NotificationService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    var token = route.params.token;

    return this._authService
      .resetPasswordRequest(token)
      .pipe(
        map(result => {
          if (!result.status) {
            return false;
          }
          return true;
        }),
        take(1),
        catchError((error, caught) => {
          this.notify(
            'Password Reset Expired', 
            'Your password reset is invalid or has expired.  Please reset your password again',
            30001)
          this._router.navigate([this.loginUrl]);
          return of(false);
        }
        ));
  }

  notify(title, content, number?, isMessage?) {
    var color = isMessage ? '#739E73' : '#C46A69'
    var icon = isMessage ? 'fa fa-check' : 'fa fa-warning shake animated'

    this._notificationService.bigBox({
      title: title,
      content: content,
      color: color,
      icon: icon,
      number: number || '1',
      timeout: 8000
    });
  }
}
