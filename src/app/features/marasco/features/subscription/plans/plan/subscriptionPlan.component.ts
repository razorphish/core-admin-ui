import { SubscriptionUserService } from './../../users/shared/subscriptionUser.service';
import { ApplicationService } from './../../../account/applications/shared/application.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import {
  SubscriptionPlan,
  SubscriptionItem,
  SubscriptionPlanService,
  SubscriptionPlanFactory,
  SubscriptionItemFactory,
} from '../shared/';

import {
  SubscriptionUser,
  SubscriptionUserFactory
} from '../../users/shared/'

import * as moment from 'moment';
import { IApplication } from '../../../account/applications';
import { ModalDirective } from 'ngx-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'marasco-subscriptions-plan',
  templateUrl: 'subscriptionPlan.component.html',
  styleUrls: ['./subscriptionPlan.component.css'],
})
export class SubcriptionPlanComponent implements OnInit {
  //////////////////Private variables///////////

  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
  public applications: IApplication[];

  public defaultPlan: SubscriptionPlan = {};
  public defaultUser: SubscriptionUser = {};

  public dropdownSettingsStatus = {};
  public dropdownSettingsApplication = {};
  public dropdownSettingsItemType = {};
  public dropdownSettingsFrequency = {};
  public dropdownSettingsUserStatus = {};

  public isUpdate = true;
  public isUpdateItem = false;
  public isUpdateUser = false;

  public optionsItemType = [
    {
      _id: 'subscription',
      name: 'subscription',
    },
    {
      _id: 'add-on',
      name: 'add-on',
    },
    {
      _id: 'exclusive',
      name: 'exclusive',
    },
  ];

  public optionsStatus = [
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

  public selectedStatus = [];
  public selectedApplication = [];
  public selectedType = [];
  public selectedFrequency = [];
  public selectedUserStatus = [];

  public state: any = {
    tabs: {
      demo1: 0,
    },
  };

  public subscriptionItem: SubscriptionItem = {
    name: '',
  };

  public subscriptionPlan: SubscriptionPlan = this.defaultPlan;

  public subscriptionUser: SubscriptionUser = this.defaultUser;

  public validationPlan: any = {
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
      },
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
        required: 'Please select an expiration date',
      },
    },
  };

  public validationItem: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true,
      },
      subject: {
        required: true,
      },
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter email notification name',
      },
      subject: {
        required: 'Please enter a subject',
      },
    },
  };

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

  public tableOptionsItems: any = {};
  public tableOptionsUsers: any = {};

  //Modals
  @ViewChild('modalItem') public modalItem: ModalDirective;
  @ViewChild('modalUser') public modalUser: ModalDirective;

  //Forms
  @ViewChild('subscriptionPlanForm') subscriptionPlanForm;
  @ViewChild('subscriptionItemForm') subscriptionItemForm;
  @ViewChild('subscriptionUserForm') subscriptionUserForm;

  constructor(
    private _service: SubscriptionPlanService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: SubscriptionPlanFactory,
    private _itemFactory: SubscriptionItemFactory,
    private _userFactory: SubscriptionUserFactory,
    private _activityLogService: ActivityLogSubjectService,
    private _applicationService: ApplicationService
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
          this.subscriptionPlan = this._route.snapshot.data['subscriptionPlan'];
          this.isUpdate = true;
        } else {
          this.isUpdate = false;
        }
      });

      this.selectedApplication.push(this.subscriptionPlan.applicationId);
      this.selectedStatus.push(this.subscriptionPlan.statusId);
      this.parseDate(this.subscriptionPlan.dateExpire);
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  /////////////////////////////////////
  // Public Metods
  /////////////////////////////////////

  public hideModalItem() {
    this.selectedType = [];
    this.modalItem.hide();
  }

  public hideModalUser() {
    this.selectedFrequency = [];
    this.selectedUserStatus = [];
    this.modalUser.hide();
  }

  public save(form: any) {
    if (this.validate()) {
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public saveItem(form: any) {
    if (this.validateItem()) {
      this.subscriptionItem.dateModified = moment().toDate();
      if (this.isUpdateItem) {
        this.updateItem();
      } else {
        this.insertItem();
      }
    }
  }

  public saveUser(form: any) {
    if (this.validateUser()) {
      this.subscriptionUser.dateModified = moment().toDate();
      if (this.isUpdateUser) {
        this.updateUser();
      } else {
        this.insertUser();
      }
    }
  }

  public showModalItem(data: any): void {
    this.modalItem.show();

    this.subscriptionItem = data;

    if (!!data._id) {
      this.selectedType = [data.typeId];
      this.isUpdateItem = true;
    } else {
      this.isUpdateItem = false;
    }
  }

  public showModalUser(data: any): void {
    this.modalUser.show();

    this.subscriptionUser = data;

    if (!!data._id) {
      this.selectedFrequency = [data.frequencyId];
      this.selectedApplication = [data.statusId];
      this.isUpdateItem = true;
    } else {
      this.isUpdateItem = false;
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
    this.activateDropdowns();

    this._applicationService.all().subscribe((data) => {
      this.applications = data;
    });

    this.activateTables();
  }

  private activateDropdowns() {
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

    this.dropdownSettingsItemType = {
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

  private activateTableItems() {
    const that = this;

    this.tableOptionsItems = {
      dom: 'Bfrtip',
      data: this.subscriptionPlan.items,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name' },
        { data: 'description', title: 'Description' },
        {
          data: 'amount',
          title: 'Amount',
        },
        { data: 'saleAmount', title: 'Sale Amount' },
        { data: 'typeId', title: 'Type' },
        { data: 'limit', title: 'Limit' },
        {
          data: 'dateCreated',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          },
        },
      ],
      buttons: [
        'copy',
        'pdf',
        'print',
        {
          text: 'Create',
          action: function(e, dt, node, config) {
            that.showModalItem(that.subscriptionItem);
          },
          className: 'btn btn-primary',
        },
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          that.showModalItem(data);
        });
        return row;
      },
    };
  }

  private activateTableUsers() {
    const that = this;

    this.tableOptionsUsers = {
      dom: 'Bfrtip',
      data: this.subscriptionPlan.users,
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
          that.showModalUser(data);
        });
        return row;
      },
    };
  }

  private activateTables() {
    this.activateTableItems();
    this.activateTableUsers();
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
   * @description Inserts a subscription plan
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private insert() {
    this._service.insert(this.subscriptionPlan).subscribe(
      (item) => {
        if (item) {
          this._activityLogService.addInserts(
            `Inserted {subscriptionPlan} ${item._id}`
          );
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

  /**
   * @description Inserts a subscription item
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private insertItem() {
    this._service.insertItem(this.subscriptionItem).subscribe(
      (item) => {
        if (item) {
          this._activityLogService.addInserts(
            `Inserted {subscriptionItem} ${item._id}`
          );
          this._notificationService.smallBox({
            title: '[Subscription Item] created',
            content: '[Subscription Item] has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4',
          });

          this.subscriptionItem._id = item._id;
          this.selectedType = [];
          this.modalItem.hide();
          
          this.refresh();
        } else {
          this._activityLogService.addError(
            '[Subscription Item] not returned from database on insert'
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
   * @description Inserts a subscription user
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private insertUser() {
    this._service.insertUser(this.subscriptionUser).subscribe(
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

          this.modalUser.hide();

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

  private parseDate(dateTimeString) {
    this.subscriptionPlan.dateExpire = moment(dateTimeString).format('L');
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
      .navigateByUrl('/subscription/plans', { skipLocationChange: false })
      .then(() =>
        this._router.navigate([
          `/subscription/plans/details/${this.subscriptionPlan._id}`,
        ])
      );
  }

  /**
   * @description Updates a subscription plan
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private update() {
    this._service.update(this.subscriptionPlan).subscribe(
      (item) => {
        if (item) {
          this._activityLogService.addUpdate(
            `Updated {subscriptionPlan} ${item._id}`
          );
          this._notificationService.smallBox({
            title: '[Subscription Plan] Updated',
            content: '[Subscription Plan] has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4',
          });
        } else {
          this._activityLogService.addError(
            'No {subscriptionPlan} present: Update Failed'
          );
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content:
              'No {subscriptionPlan} returned which means that {subscriptionPlan} was not updated',
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
   * @description Updates a subscription item
   * @author Antonio Marasco
   * @date 2019-08-04
   * @private
   * @memberof SubcriptionPlanComponent
   */
  private updateItem() {
    this._service.updateItem(this.subscriptionItem).subscribe(
      (item) => {
        this.subscriptionItem = item;

        this._activityLogService.addUpdate(
          `Updated subscription item ${this.subscriptionItem._id}`
        );

        this._notificationService.smallBox({
          title: 'Item Updated',
          content: 'Item has been updated successfully. ',
          color: '#739E73',
          timeout: 4000,
          icon: 'fa fa-check',
          number: '4',
        });

        this.modalItem.hide();

        this.refresh();
      },
      (error) => {
        this.displayServerErrors(error);
      }
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
    this._service.updateUser(this.subscriptionUser).subscribe(
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

        this.modalUser.hide();

        this.refresh();
      },
      (error) => {
        this.displayServerErrors(error);
      }
    );
  }

  /**
   * @description Validates the Subscription plan form
   * @author Antonio Marasco
   * @date 2019-08-01
   * @private
   * @returns {boolean} True if plan form validates; otherwise false
   * @memberof SubcriptionPlanComponent
   */
  private validate(): boolean {
    this.subscriptionPlan.statusId = this.selectedStatus[0];
    this.subscriptionPlan.applicationId = this.selectedApplication[0];

    return this._factory.validate(this.subscriptionPlan, this.displayErrors);
  }

  /**
   * @description Validates subscription plan item form
   * @author Antonio Marasco
   * @date 2019-08-01
   * @private
   * @returns {boolean} True if item validated; otherwise false
   * @memberof SubcriptionPlanComponent
   */
  private validateItem(): boolean {
    this.subscriptionItem.typeId = this.selectedType[0];
    this.subscriptionItem.applicationId = this.subscriptionPlan.applicationId;
    this.subscriptionItem.subscriptionPlanId = this.subscriptionPlan._id;

    return this._itemFactory.validate(
      this.subscriptionItem,
      this.displayErrors
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
    this.subscriptionUser.subscriptionPlanId = this.subscriptionPlan._id;

    return this._userFactory.validate(
      this.subscriptionUser,
      this.displayErrors
    );
  }
}
