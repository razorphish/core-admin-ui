import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { Wishlist } from '../shared/Wishlist.interface';
import { WishlistsService } from '../shared/wishlists.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class WishlistListResolve implements Resolve<Wishlist[]> {
  constructor(
    private _wishlistService: WishlistsService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {

    this._activityLogService.addGet('Get all wishlists');
    return this._wishlistService.allDetails();
  }
}
