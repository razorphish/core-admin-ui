import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { IUser } from './../shared/IUser';
import { UserService } from './../shared/user.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class UserListResolve implements Resolve<IUser[]> {
  constructor(
    private _userService: UserService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    // return this._userService.all(route.paramMap.get('id'));
    this._activityLogService.addGet('Get all users');
    return this._userService.all();
  }
}
