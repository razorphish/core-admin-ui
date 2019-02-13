
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

// Local
import { WishlistAppService } from '../shared/wishlist-app-service';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class WishlistAppSettingsResolve implements Resolve<any> {
  constructor(
    private _wishlistAppSettingsService: WishlistAppService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._wishlistAppSettingsService.all();
  }
}
