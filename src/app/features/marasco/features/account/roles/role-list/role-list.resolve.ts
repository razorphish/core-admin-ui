import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { RoleService } from './../shared/role.service';
import { IRole } from './../shared/IRole';

@Injectable()
export class RoleListResolve implements Resolve<IRole[]> {
  constructor(private _roleService: RoleService,
    private _activityLogService: ActivityLogSubjectService) {}

  resolve(route: ActivatedRouteSnapshot) {
    this._activityLogService.addGet('Get all roles');
    return this._roleService.all();
  }
}
