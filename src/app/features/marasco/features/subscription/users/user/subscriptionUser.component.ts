import { SubscriptionPlanService } from './../../plans/shared/subscriptionPlan.service';
import { ApplicationService } from '../../../account/applications/shared/application.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import {
  SubscriptionUser,
  SubscriptionUserFactory,
  SubscriptionUserService,
} from '../shared';

import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { SubscriptionPlan } from '../../plans/shared';

@Component({
  selector: 'marasco-subscriptions-user',
  templateUrl: 'subscriptionUser.component.html',
  styleUrls: ['./subscriptionUser.component.css'],
})
export class SubcriptionUserComponent implements OnInit {
  //////////////////Private variables///////////

  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
  public subscriptionPlans: SubscriptionPlan[];

  public defaultUser: SubscriptionUser = {};

  public dropdownSettingsSubscriptionPlans = {};
  public dropdownSettingsFrequency = {};
  public dropdownSettingsUserStatus = {};

  public isUpdate = true;

  public optionsFrequency = [
    {
      _id: 'annually',
      name: 'annually',
    },
    {
      _id: 'monthly',
      name: 'monthly',
    },
    {
      _id: 'one-time',
      name: 'one-time',
    },
    {
      _id: 'weekly',
      name: 'weekly',
    },
    {
      _id: 'daily',
      name: 'daily',
    },
  ];

  public optionsUserStatus = [
    {
      _id: 'active',
      name: 'active',
    },
    {
      _id: 'cancelled',
      name: 'cancelled',
    },
  ];

  public selectedSubscriptionPlan = [];
  public selectedFrequency = [];
  public selectedUserStatus = [];

  public state: any = {
    tabs: {
      demo1: 0,
    },
  };

  public subscriptionUser: SubscriptionUser = this.defaultUser;

  public validationUser: any = {
    // Rules for form validation
    rules: {
      userId: {
        required: true,
      },
      subscriptionPlanId: {
        required: true,
      },
      frequencyId: {
        required: true,
      },
      statusId: {
        required: true,
      },
      dateStart: {
        required: true,
      },
      dateEnd: {
        required: true,
      },
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'User required',
      },
      subscriptionPlanId: {
        required: 'Please enter a subscription plan',
      },
      frequencyId: {
        required: 'Please select a frequency',
      },
      statusId: {
        required: 'Please select a status',
      },
      dateStart: {
        required: 'Please select a date start',
      },
      dateEnd: {
        required: 'Please select a date end',
      },
    },
  };

  public tableOptionsUsers: any = {};


  //Forms
  @ViewChild('subscriptionUserForm') subscriptionUserForm;

  constructor(
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _userFactory: SubscriptionUserFactory,
    private _activityLogService: ActivityLogSubjectService,
    private _service: SubscriptionUserService,
    private _subscriptionPlanService: SubscriptionPlanService
  ) {}

  /////////////////////////////////////
  // Events
  /////////////////////////////////////

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      //this.subscriptionPlan = this._route.snapshot.data['subscriptionPlan'];
      this._route.params.subscribe((params) => {
        const id = params['id'];
        if (id !== '0') {
          this.subscriptionUser = this._route.snapshot.data['subscriptionUser'];
          this.isUpdate = true;
        } else {
          this.isUpdate = false;
        }
      });

      this.selectedFrequency.push(this.subscriptionUser.frequencyId);
      this.selectedUserStatus.push(this.subscriptionUser.statusId);
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  /////////////////////////////////////
  // Public Metods
  /////////////////////////////////////


  public saveUser(form: any) {
    if (this.validateUser()) {
      this.subscriptionUser.dateModified = moment().toDate();
      if (this.isUpdate) {
        this.updateUser();
      } else {
        this.insertUser();
      }
    }
  }

  public toList() {
    this._router.navigate(['/subscription/users']);
  }

  /////////////////////////////////////
  // Private Metods
  /////////////////////////////////////
  /**
   * Activate the component
   */
  private activate() {
    this.activateDropdowns();

    this._subscriptionPlanService.all().subscribe((data) => {
      this.subscriptionPlans = data;
    });

    this.activateTables();
  }

  private activateDropdowns() {

    this.dropdownSettingsSubscriptionPlans = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
    };

    this.dropdownSettingsFrequency = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
    };

    this.dropdownSettingsUserStatus = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
    };
  }


  private activateTableSubscriptionPlans() {
    const that = this;

    this.tableOptionsUsers = {
      dom: 'Bfrtip',
      data: this.subscriptionPlans,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name', render: (data, type, row, meta) => {} },
        { data: 'frequencyId', title: 'Frequency' },
        { data: 'statusId', title: 'Status' },
        { data: 'dateStart', title: 'Start' },
        { data: 'dateEnd', title: 'End' },
        {
          data: 'dateCreated',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          },
        },
      ],
      buttons: ['copy', 'pdf', 'print'],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          //that.showModalUser(data);
        });
        return row;
      },
    };
  }

  private activateTables() {
    this.activateTableSubscriptionPlans();
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

  private displayServerErrors(error: HttpErrorResponse): void {
    // event.errors.join("<br>").toString()
    const notificationService = new NotificationService();
    notificationService.bigBox({
      title: error.statusText,
      content: error.error.errmsg,
      color: '#C46A69',
      icon: 'fa fa-warning shake animated',
      number: '1',
      timeout: 6000, // 6 seconds
    });
  }

  /**
   * @description Inserts a subscription user
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private insertUser() {
    this._service.insert(this.subscriptionUser).subscribe(
      (user) => {
        if (user) {
          this._activityLogService.addInserts(
            `Inserted {subscriptionUser} ${user._id}`
          );
          this._notificationService.smallBox({
            title: '[Subscription User] created',
            content: '[Subscription User] has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4',
          });

          this.subscriptionUser._id = user._id;
          this.selectedFrequency = [];
          this.selectedUserStatus = [];

          this.refresh();
        } else {
          this._activityLogService.addError(
            '[Subscription User] not returned from database on insert'
          );
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content:
              '[Subscription Item] was not returned indicating that {subscriptionPlan} was not in fact updated',
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

  /**
   * @description Refreshes page after insert update to update datatables
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private refresh() {
    this._router
      .navigateByUrl('/subscription/users', { skipLocationChange: false })
      .then(() =>
        this._router.navigate([
          `/subscription/users/details/${this.subscriptionUser._id}`,
        ])
      );
  }

  /**
   * @description Updates a subscription user
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private updateUser() {
    this._service.update(this.subscriptionUser).subscribe(
      (user) => {
        this.subscriptionUser = user;

        this._activityLogService.addUpdate(
          `Updated subscription user ${this.subscriptionUser._id}`
        );

        this._notificationService.smallBox({
          title: 'User Updated',
          content: 'User has been updated successfully. ',
          color: '#739E73',
          timeout: 4000,
          icon: 'fa fa-check',
          number: '4',
        });

        this.refresh();
      },
      (error) => {
        this.displayServerErrors(error);
      }
    );
  }

  /**
   * @description Validates subscription User
   * @author Antonio Marasco
   * @date 2019-08-03
   * @private
   * @returns {boolean}
   * @memberof SubcriptionPlanComponent
   */
  private validateUser(): boolean {
    this.subscriptionUser.frequencyId = this.selectedFrequency[0];
    this.subscriptionUser.statusId = this.selectedUserStatus[0];
    this.subscriptionUser.subscriptionPlanId = this.selectedSubscriptionPlan[0];

    return this._userFactory.validate(
      this.subscriptionUser,
      this.displayErrors
    );
  }
}
