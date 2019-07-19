import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { Job } from '../shared/Job.interface';
import { JobsService } from '../shared/jobs.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class JobListResolve implements Resolve<Job[]> {
  constructor(
    private _jobService: JobsService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {

    this._activityLogService.addGet('Get all jobs');
    return this._jobService.allDetails();
  }
}
