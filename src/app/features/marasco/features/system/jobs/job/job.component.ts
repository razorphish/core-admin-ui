import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { Job } from '../shared/Job.interface';
import { JobsService } from '../shared/jobs.service';
import { JobFactory } from '../shared/job.factory';

import * as moment from 'moment';

@Component({
  selector: 'marasco-system-job',
  templateUrl: 'job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  //////////////////Private variables///////////

  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
  public activityStatusOptions = [
    {
      _id: 'ready',
      name: 'ready',
    },
    {
      _id: 'running',
      name: 'running',
    },
    {
      _id: 'paused',
      name: 'paused',
    },
    {
      _id: 'fail',
      name: 'fail',
    },
    {
      _id: 'terminated',
      name: 'terminated',
    },
    {
      _id: 'executed',
      name: 'executed',
    },
    {
      _id: 'restarted',
      name: 'restarted',
    },
    {
      _id: 'completed',
      name: 'completed',
    },
  ];

  public statusOptions = [
    {
      _id: 'active',
      name: 'active',
    },
    {
      _id: 'inactive',
      name: 'inactive',
    },
    {
      _id: 'disabled',
      name: 'disabled',
    },
    {
      _id: 'pending',
      name: 'pending',
    },
    {
      _id: 'archived',
      name: 'archived',
    },
    {
      _id: 'suspended',
      name: 'suspended',
    },
    {
      _id: 'deleted',
      name: 'deleted',
    },
  ];

  public selectedActivityStatus = [];
  public selectedStatus = [];

  public defaultJob: Job = {
    execution: {
      kickoff: null,
      started: null,
      completed: null,
    },
  };

  public dropdownSettingsActivityStatus = {};
  public dropdownSettingsStatus = {};
  public isUpdate = true;
  public options = [];
  public state: any = {
    tabs: {
      demo1: 0,
    },
  };

  public job: Job = this.defaultJob;

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true,
      },
      userId: {
        required: true,
      },
      statusId: {
        required: true,
      },
      activityStatusId: {
        required: true,
      },
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter your name',
      },
      userId: {
        required: 'Please enter a userId',
      },
      statusId: {
        required: 'Please enter a status',
      },
      activityStatusId: {
        required: 'Please enter an activity status',
      },
    },
  };

  // @Input() filter = "ion ([7-9]|[1][0-2])";
  @Input() filter = '';

  @ViewChild('jobDetailsForm') jobDetailsForm;

  constructor(
    private _jobService: JobsService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: JobFactory,
    private _activityLogService: ActivityLogSubjectService,
    private _upperCasePipe: UpperCasePipe
  ) {}

  /////////////////////////////////////
  // Events
  /////////////////////////////////////

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.job = this._route.snapshot.data['job'];
      this.selectedStatus.push(this.job.statusId);
      this.selectedActivityStatus.push(this.job.activityStatusId);
      this.parseDate(this.job.execution.kickoff);
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  onItemSelect(item: any) {
    //console.log(item);
  }

  onSelectAll(items: any) {
    //console.log(items);
  }

  /////////////////////////////////////
  // Public Metods
  /////////////////////////////////////

  public save(jobDetailsForm: any) {
    if (this.validate()) {
      this.job.normalizedName = this._upperCasePipe.transform(this.job.name);
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public toList() {
    this._router.navigate(['/system/jobs']);
  }

  /////////////////////////////////////
  // Private Metods
  /////////////////////////////////////
  /**
   * Activate the component
   */
  private activate() {
    this.dropdownSettingsStatus = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
    };

    this.dropdownSettingsActivityStatus = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
    };
  }

  private displayErrors(errors: string[]): void {
    // event.errors.join("<br>").toString()
    const notificationService = new NotificationService();
    notificationService.bigBox({
      title: 'Oops!  There are some validation errors',
      content: errors.join('<br>').toString(),
      color: '#C46A69',
      icon: 'fa fa-warning shake animated',
      number: '1',
      timeout: 6000, // 6 seconds
    });
  }

  /**
   * Insert an item in the database
   */
  private insert() {
    this.job.statusId = this.selectedStatus[0];
    this.job.activityStatusId = this.selectedActivityStatus[0];

    this._jobService.insert(this.job).subscribe(
      (item) => {
        if (item) {
          this._activityLogService.addInserts(`Inserted job ${item._id}`);
          this._notificationService.smallBox({
            title: '[Job] created',
            content: '[Job] has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4',
          });
          this.isUpdate = true;
          this.job._id = item._id;
        } else {
          this._activityLogService.addError(
            '[Job] not returned from database on insert'
          );
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content:
              '[Job] was not returned indicating that {job} was not in fact updated',
            color: '#C46A69',
            icon: 'fa fa-warning shake animated',
            number: '1',
            timeout: 6000, // 6 seconds
          });
        }
      },
      (errInfo) => {
        this._activityLogService.addError(errInfo);
        this._notificationService.bigBox({
          title: 'Oops!  there is an issue with the call to create',
          content: errInfo.error.message || errInfo.message,
          color: '#C46A69',
          icon: 'fa fa-warning shake animated',
          number: '1',
          timeout: 6000, // 6 seconds
        });
      },
      () => {
        // Clean up
      }
    );
  }

  private parseDate(dateTimeString) {
    this.job.execution.kickoffDate = moment(dateTimeString).format('L');

    this.job.execution.kickoffTime = moment(dateTimeString)
      .local()
      .toDate();
  }

  private datify() {
    let kickoffDate = new Date(this.job.execution.kickoffDate);
    let kickoffTime = new Date(this.job.execution.kickoffTime);

    this.job.execution.kickoff = moment([
      kickoffDate.getFullYear(),
      kickoffDate.getMonth(),
      kickoffDate.getDate(),
      kickoffTime.getHours(),
      kickoffTime.getMinutes()
    ]);
  }

  /**
   * Update item
   */
  private update() {
    this.datify();
    this.job.statusId = this.selectedStatus[0];
    this.job.activityStatusId = this.selectedActivityStatus[0];

    this._jobService.update(this.job).subscribe(
      (item) => {
        if (item) {
          this._activityLogService.addUpdate(`Updated {job} ${item._id}`);
          this._notificationService.smallBox({
            title: '[Job] Updated',
            content: '[Job] has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4',
          });
        } else {
          this._activityLogService.addError('No {job} present: Update Failed');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'No {job} returned which means that {job} was not updated',
            color: '#C46A69',
            icon: 'fa fa-warning shake animated',
            number: '1',
            timeout: 6000, // 6 seconds
          });
        }
      },
      (err) => {
        this._activityLogService.addError(err);
        this._notificationService.bigBox({
          title: 'Oops!  there is an issue with the call to update',
          content: err,
          color: '#C46A69',
          icon: 'fa fa-warning shake animated',
          number: '1',
          timeout: 6000, // 6 seconds
        });
      },
      () => {
        // Clean up
      }
    );
  }

  /**
   * Validate the item
   */
  private validate(): boolean {
    return this._factory.validate(this.job, this.displayErrors);
  }
}
