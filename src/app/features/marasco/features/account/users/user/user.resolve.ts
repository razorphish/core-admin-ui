
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local
import { IUser } from './../shared/IUser';
import { UserService } from './../shared/user.service';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class UserResolve implements Resolve<IUser> {
  constructor(
    private _userService: UserService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting user id: ${id}`);
    return this._userService.get(id);
  }
}
