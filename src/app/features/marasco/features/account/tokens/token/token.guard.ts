import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert('Invalid token Id');

      this._router.navigate(['/tokens']);
      return false;
    };

    return true;
  }
}
