import { SubscriptionItemService } from './../shared/subscriptionItem.service';
import { SubscriptionItem } from './../shared/SubscriptionItem.interface';
import { ApplicationService } from './../../../account/applications/shared/application.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import {
  SubscriptionPlan,
  SubscriptionPlanService,
  SubscriptionPlanFactory,
  SubscriptionItemFactory
} from '../shared/';

import * as moment from 'moment';
import { Application } from '../../../account/applications';
import { ModalDirective } from 'ngx-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'marasco-subscriptions-plan',
  templateUrl: 'subscriptionPlan.component.html',
  styleUrls: ['./subscriptionPlan.component.css']
})
export class SubcriptionPlanComponent implements OnInit {
  //////////////////Private variables///////////

  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
  public applications: Application[];

  public statusOptions = [
    {
      _id: 'active',
      name: 'active'
    },
    {
      _id: 'disabled',
      name: 'disabled'
    },
    {
      _id: 'pending',
      name: 'pending'
    },
    {
      _id: 'archived',
      name: 'archived'
    },
    {
      _id: 'deleted',
      name: 'deleted'
    }
  ];

  public selectedStatus = [];
  public selectedApplication = [];
  public selectedType = [];

  public defaultJob: SubscriptionPlan = {};

  public dropdownSettingsStatus = {};
  public dropdownSettingsApplication = {};
  public dropdownSettingsItemType = {};

  public itemTypeOptions = [
    {
      _id: 'subscription',
      name: 'subscription'
    },
    {
      _id: 'add-on',
      name: 'add-on'
    },
    {
      _id: 'exclusive',
      name: 'exclusive'
    }
  ];

  public subscriptionItem: SubscriptionItem = {
    name: ''
  };

  public options = [];
  public state: any = {
    tabs: {
      demo1: 0
    }
  };

  public subscriptionPlan: SubscriptionPlan = this.defaultJob;

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true
      },
      applicationId: {
        required: true
      },
      statusId: {
        required: true
      },
      description: {
        required: true
      },
      dateExpire: {
        required: true
      }
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter a name'
      },
      applicationId: {
        required: 'Please select an application'
      },
      statusId: {
        required: 'Please enter a status'
      },
      description: {
        required: 'Please enter a description'
      },
      dateExpire: {
        required: 'Please select an expiration date'
      }
    }
  };

  public validationItemOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true
      },
      subject: {
        required: true
      }
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter email notification name'
      },
      subject: {
        required: 'Please enter a subject'
      }
    }
  };

  public optionsItemsTable: any = {};

  public isUpdate = true;
  public isUpdateItem = false;

  @ViewChild('lgItemModal') public lgItemModal: ModalDirective;

  //Forms
  @ViewChild('subscriptionPlanDetailsForm') subscriptionPlanDetailsForm;
  @ViewChild('subscriptionItemForm') subscriptionItemForm;

  constructor(
    private _service: SubscriptionPlanService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: SubscriptionPlanFactory,
    private _itemFactory: SubscriptionItemFactory,
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
      this._route.params.subscribe(params => {
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

  public hideModal() {
    this.selectedType = [];
    this.lgItemModal.hide();
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

  public showItemModal(data: any): void {
    this.lgItemModal.show();

    this.subscriptionItem = data;

    if (!!data._id) {
      this.selectedType = [data.typeId];
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
    this.dropdownSettingsStatus = {
      singleSelection: true,
      idField: '_id',
      textField: 'name'
    };

    this.dropdownSettingsApplication = {
      singleSelection: true,
      idField: '_id',
      textField: 'name'
    };

    this.dropdownSettingsItemType = {
      singleSelection: true,
      idField: '_id',
      textField: 'name'
    };

    this._applicationService.all().subscribe(data => {
      this.applications = data;
    });

    this.activateItemsTable();
  }

  private activateItemsTable() {
    const that = this;

    this.optionsItemsTable = {
      dom: 'Bfrtip',
      data: this.subscriptionPlan.items,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name' },
        { data: 'description', title: 'Description' },
        {
          data: 'amount',
          title: 'Amount'
        },
        { data: 'saleAmount', title: 'Sale Amount' },
        { data: 'typeId', title: 'Type' },
        { data: 'limit', title: 'Limit' },
        {
          data: 'dateCreated',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          }
        }
      ],
      buttons: [
        'copy',
        'pdf',
        'print',
        {
          text: 'Create',
          action: function(e, dt, node, config) {
            that.showItemModal(that.subscriptionItem);
          },
          className: 'btn btn-primary'
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          that.showItemModal(data);
        });
        return row;
      }
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
      timeout: 6000 // 6 seconds
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
      timeout: 6000 // 6 seconds
    });
  }

  /**
   * Insert an item in the database
   */
  private insert() {
    this._service.insert(this.subscriptionPlan).subscribe(
      item => {
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
            number: '4'
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
            timeout: 6000 // 6 seconds
          });
        }
      },
      errInfo => {
        this._activityLogService.addError(errInfo);
        this._notificationService.bigBox({
          title: 'Oops!  there is an issue with the call to create',
          content: errInfo.error.message || errInfo.message,
          color: '#C46A69',
          icon: 'fa fa-warning shake animated',
          number: '1',
          timeout: 6000 // 6 seconds
        });
      },
      () => {
        // Clean up
      }
    );
  }

  /**
   * Insert an item in the database
   */
  private insertItem() {
    this._service.insertItem(this.subscriptionItem).subscribe(
      item => {
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
            number: '4'
          });
          this.subscriptionItem._id = item._id;
          this.selectedType = [];
          this.lgItemModal.hide();
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
            timeout: 6000 // 6 seconds
          });
        }
      },
      errInfo => {
        this._activityLogService.addError(errInfo);
        this._notificationService.bigBox({
          title: 'Oops!  there is an issue with the call to create',
          content: errInfo.error.message || errInfo.message,
          color: '#C46A69',
          icon: 'fa fa-warning shake animated',
          number: '1',
          timeout: 6000 // 6 seconds
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
    this._service.update(this.subscriptionPlan).subscribe(
      item => {
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
            number: '4'
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
            timeout: 6000 // 6 seconds
          });
        }
      },
      err => {
        this._activityLogService.addError(err);
        this._notificationService.bigBox({
          title: 'Oops!  there is an issue with the call to update',
          content: err,
          color: '#C46A69',
          icon: 'fa fa-warning shake animated',
          number: '1',
          timeout: 6000 // 6 seconds
        });
      },
      () => {
        // Clean up
      }
    );
  }

  private updateItem() {
    this._service.updateItem(this.subscriptionItem).subscribe(
      subscriptionItem => {
        this.subscriptionItem = subscriptionItem;

        this._activityLogService.addUpdate(
          `Updated subscription item ${this.subscriptionItem._id}`
        );

        this._notificationService.smallBox({
          title: 'Item Updated',
          content: 'Item has been updated successfully. ',
          color: '#739E73',
          timeout: 4000,
          icon: 'fa fa-check',
          number: '4'
        });

        this.lgItemModal.hide();
        this._router
          .navigateByUrl('/subscription/plans', { skipLocationChange: false })
          .then(() =>
            this._router.navigate([`/subscription/plans/details/${this.subscriptionPlan._id}`])
          );
      },
      error => {
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
}
