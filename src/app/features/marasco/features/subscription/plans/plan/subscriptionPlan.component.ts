import { ApplicationService } from './../../../account/applications/shared/application.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { SubscriptionPlan } from '../shared/SubscriptionPlan.interface';
import { SubscriptionPlanService } from '../shared/subscriptionPlan.service';
import { SubscriptionPlanFactory } from '../shared/subscriptionPlan.factory';

import * as moment from 'moment';
import { Application } from '../../../account/applications';

@Component({
  selector: 'marasco-subscriptions-plan',
  templateUrl: 'subscriptionPlan.component.html',
  styleUrls: ['./subscriptionPlan.component.css'],
})
export class SubcriptionPlanComponent implements OnInit {
  //////////////////Private variables///////////

  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
  public applications: Application[];

  public statusOptions = [
    {
      _id: 'active',
      name: 'active',
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
      _id: 'deleted',
      name: 'deleted',
    },
  ];

  public selectedStatus = [];
  public selectedApplication = [];

  public defaultJob: SubscriptionPlan = { };

  public dropdownSettingsStatus = {};
  public dropdownSettingsApplication = {};

  public isUpdate = true;
  public options = [];
  public state: any = {
    tabs: {
      demo1: 0,
    },
  };

  public subscriptionPlan: SubscriptionPlan = this.defaultJob;

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true,
      },
      applicationId: {
        required: true,
      },
      statusId: {
        required: true,
      },
      description: {
        required: true,
      },
      dateExpire: {
        required: true,
      }
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter a name',
      },
      applicationId: {
        required: 'Please select an application',
      },
      statusId: {
        required: 'Please enter a status',
      },
      description: {
        required: 'Please enter a description',
      },
      dateExpire: {
        required: 'Please select an expiration date'
      }
    },
  };

  // @Input() filter = "ion ([7-9]|[1][0-2])";
  @Input() filter = '';

  @ViewChild('subscriptionPlanDetailsForm') subscriptionPlanDetailsForm;

  constructor(
    private _service: SubscriptionPlanService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: SubscriptionPlanFactory,
    private _activityLogService: ActivityLogSubjectService,
    private _applicationService: ApplicationService
  ) {}

  /////////////////////////////////////
  // Events
  /////////////////////////////////////

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.subscriptionPlan = this._route.snapshot.data['subscriptionPlan'];
      this.selectedStatus.push(this.subscriptionPlan.statusId);
      this.parseDate(this.subscriptionPlan.dateExpire);
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

      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public toList() {
    this._router.navigate(['/subscription/plans']);
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

    this.dropdownSettingsApplication = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
    };

    this._applicationService
      .all()
      .subscribe((data) => {
        this.applications = data;
      })
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

    this._service.insert(this.subscriptionPlan).subscribe(
      (item) => {
        if (item) {
          this._activityLogService.addInserts(`Inserted {subscriptionPlan} ${item._id}`);
          this._notificationService.smallBox({
            title: '[Subscription Plan] created',
            content: '[Subscription Plan] has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4',
          });
          this.isUpdate = true;
          this.subscriptionPlan._id = item._id;
        } else {
          this._activityLogService.addError(
            '[Subscription Plan] not returned from database on insert'
          );
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content:
              '[Subscription Plan] was not returned indicating that {subscriptionPlan} was not in fact updated',
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
    this.subscriptionPlan.dateExpire = moment(dateTimeString).format('L');

  }

  /**
   * Update item
   */
  private update() {
    this.subscriptionPlan.statusId = this.selectedStatus[0];

    this._service.update(this.subscriptionPlan).subscribe(
      (item) => {
        if (item) {
          this._activityLogService.addUpdate(`Updated {subscriptionPlan} ${item._id}`);
          this._notificationService.smallBox({
            title: '[Subscription Plan] Updated',
            content: '[Subscription Plan] has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4',
          });
        } else {
          this._activityLogService.addError('No {subscriptionPlan} present: Update Failed');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'No {subscriptionPlan} returned which means that {subscriptionPlan} was not updated',
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
    this.subscriptionPlan.statusId = this.selectedStatus[0];
    this.subscriptionPlan.applicationId = this.selectedApplication[0];
    return this._factory.validate(this.subscriptionPlan, this.displayErrors);
  }
}
