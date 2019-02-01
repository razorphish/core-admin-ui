import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { User } from '../../../../core/interfaces/UserInfo.interface';
import { UsersService } from '../shared/users.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class UserListResolve implements Resolve<User[]> {
  constructor(
    private _userService: UsersService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    // return this._userService.all(route.paramMap.get('id'));
    this._activityLogService.addGet('Get all users');
    return this._userService.allDetails();
  }
}
