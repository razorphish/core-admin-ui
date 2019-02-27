import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { ApplicationService } from '../shared/application.service';
import { Application } from '../shared/Application.interface';

@Injectable()
export class ApplicationListResolve implements Resolve<Application[]> {
  constructor(private _applicationService: ApplicationService,
    private _activityLogService: ActivityLogSubjectService) { }

  resolve(route: ActivatedRouteSnapshot) {
    this._activityLogService.addGet('Get all applications');
    return this._applicationService.all();
  }
}
