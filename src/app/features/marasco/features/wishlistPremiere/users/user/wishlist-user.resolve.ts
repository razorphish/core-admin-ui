
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

// Local
import { WishlistUsersService } from '../shared/wishlist-users.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class WishlistUserResolve implements Resolve<any> {
  constructor(
    private _wishlistUserService: WishlistUsersService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting wishlist user id: ${id}`);

    if (id === "0") {
      return of("0");
    }
    return this._wishlistUserService.getDetails(id);
  }
}
