import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class WishlistGuard implements CanActivate {
  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert('Invalid wishlist Id');

      this._router.navigate(['/wishlists']);
      return false;
    };

    return true;
  }
}
