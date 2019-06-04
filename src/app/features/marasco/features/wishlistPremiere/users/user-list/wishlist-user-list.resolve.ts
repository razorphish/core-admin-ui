import { User } from '@app/features/marasco/core/interfaces/UserInfo.interface';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { WishlistUsersService } from '../shared/wishlist-users.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class WishlistUserListResolve implements Resolve<User[]> {
  constructor(
    private _wishlistUserService: WishlistUsersService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {

    this._activityLogService.addGet('Get all wishlist users');
    return this._wishlistUserService.allDetails();
  }
}
