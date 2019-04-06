
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local
import { WishlistAppService } from '../shared/wishlist-app-service';

@Injectable()
export class WishlistAppSettingsResolve implements Resolve<any> {
  constructor(
    private _wishlistAppSettingsService: WishlistAppService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this._wishlistAppSettingsService.all();
  }
}
