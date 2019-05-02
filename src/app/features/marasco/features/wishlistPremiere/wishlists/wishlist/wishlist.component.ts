
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { Wishlist } from '../shared/Wishlist.interface';
import { WishlistsService } from '../shared/wishlists.service';
import { WishlistFactory } from './../shared/wishlist.factory';

import * as moment from 'moment';

@Component({
  selector: 'marasco-wishlist',
  templateUrl: 'wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  //////////////////Private variables///////////


  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
  public privacyOptions = [
    {
      _id: 'private',
      name: 'private'
    },
    {
      _id: 'public',
      name: 'public'
    }
  ];

  public statusOptions = [
    {
      _id: 'active',
      name: 'active'
    },
    {
      _id: 'inactive',
      name: 'inactive'
    }, {
      _id: 'disabled',
      name: 'disabled'
    }, {
      _id: 'pending',
      name: 'pending'
    }, {
      _id: 'archived',
      name: 'archived'
    }, {
      _id: 'suspended',
      name: 'suspended'
    }, {
      _id: 'deleted',
      name: 'deleted'
    }
  ]

  public selectedPrivacy = [];
  public selectedStatus = [];

  public defaultWishlist: Wishlist = {
    name: '',
    userId: '',
    preferences: {
      includePriceWhenSharing: true,
      markPurchasedItem: false,
      hideFromMe: false,
      currencyUnitSymbol: '$',
      notifyOnAddItem: true,
      notifyOnClose: true,
      notifyOnCompletion: true,
      notifyOnRemoveItem: true
    }
  };

  public dropdownSettingsPrivacy = {};
  public dropdownSettingsStatus = {};
  public isUpdate = true;
  public options = [];
  public state: any = {
    tabs: {
      demo1: 0
    }
  };

  public optionsFollowingTable: any = {};
  public optionsItemsTable: any = {};
  public optionsNotificationTable: any = {};
  public wishlist: Wishlist = this.defaultWishlist;

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true
      },
      userId: {
        required: true,
      },
      statusId: {
        required: true,
      },
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter your name'
      },
      wishlistId: {
        required: 'Please enter a wishlist',
      },
      statusId: {
        required: 'Please enter a status',
      }
    }
  };

  // @Input() filter = "ion ([7-9]|[1][0-2])";
  @Input() filter = '';

  @ViewChild('wishlistDetailsForm') wishlistDetailsForm;

  constructor(
    private _wishlistService: WishlistsService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: WishlistFactory,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  /////////////////////////////////////
  // Events
  /////////////////////////////////////

  ngOnInit() {

    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.wishlist = this._route.snapshot.data['wishlist'];
      this.selectedStatus.push(this.wishlist.statusId);
      this.selectedPrivacy.push(this.wishlist.privacy);
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  onItemSelect(item: any) {
    // Clear out current wishlist roles
    //console.log(item);

  }

  onSelectAll(items: any) {
    //console.log(items);
  }

  /////////////////////////////////////
  // Public Metods
  /////////////////////////////////////

  public save(wishlistDetailsForm: any) {
    if (this.validate()) {
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public toList() {
    this._router.navigate(['/wishlistPremiere/wishlists']);
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

    this.dropdownSettingsPrivacy = {
      singleSelection: true,
      idField: '_id',
      textField: 'name'
    }

    this.optionsNotificationTable = {
      dom: 'Bfrtip',
      data: this.wishlist.notifications,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'endpoint', title: 'Endpoint' },
        { data: 'expirationTime', title: 'Expiration Time', defaultContent: '<i>Not Set</i>' },
        {
          data: 'keys', title: 'Keys',
          render: (data, type, row, meta) => {
            return `auth:${data.auth} p256dh:${data.p256dh}`
          }
        },
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
        'print'
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        // const self = this;
        // // Unbind first in order to avoid any duplicate handler
        // // (see https://github.com/l-lin/angular-datatables/issues/87)
        // jQuery('td', row).unbind('click');
        // jQuery('td', row).bind('click', () => {
        //   self.toDetails(data);
        // });
        return row;
      }
    };

    this.optionsItemsTable = {
      dom: 'Bfrtip',
      data: this.wishlist.items,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'sortOrder', title: 'Sort' },
        { data: 'name', title: 'Name' },
        { data: 'categoryId', title: 'Category' },
        { data: 'price', title: 'Price' },
        { data: 'url', title: 'Url' },
        { data: 'purchased', title: 'Purchased' },
        { data: 'statusId', title: 'Status' },
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
        'print'
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        // const self = this;
        // // Unbind first in order to avoid any duplicate handler
        // // (see https://github.com/l-lin/angular-datatables/issues/87)
        // jQuery('td', row).unbind('click');
        // jQuery('td', row).bind('click', () => {
        //   self.toDetails(data);
        // });
        return row;
      }
    };

    this.optionsFollowingTable = {
      dom: 'Bfrtip',
      data: this.wishlist.follows,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'userId', title: 'Sort' },
        { data: 'userId', title: 'Name' },
        { data: 'notifiedOnAddItem', title: 'Add?' },
        { data: 'notifiedOnRemoveItem', title: 'Remove?' },
        { data: 'notifiedOnCompletion', title: 'Completion?' },
        { data: 'statusId', title: 'Status' },
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
        'print'
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        // const self = this;
        // // Unbind first in order to avoid any duplicate handler
        // // (see https://github.com/l-lin/angular-datatables/issues/87)
        // jQuery('td', row).unbind('click');
        // jQuery('td', row).bind('click', () => {
        //   self.toDetails(data);
        // });
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

  /**
   * Insert an item in the database
   */
  private insert() {
    this.wishlist.statusId = this.selectedStatus[0];
    this.wishlist.privacy = this.selectedPrivacy[0];

    this._wishlistService.insert(this.wishlist).subscribe(
      item => {
        if (item) {
          this._activityLogService.addInserts(
            `Inserted wishlist ${item._id}`
          );
          this._notificationService.smallBox({
            title: 'wishlist created',
            content: 'wishlist has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
          this.isUpdate = true;
          this.wishlist._id = item._id;
        } else {
          this._activityLogService.addError('wishlist not returned from database on insert');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'wishlist was not returned indicating that wishlist was not in fact updated',
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
   * Update item
   */
  private update() {
    this.wishlist.statusId = this.selectedStatus[0];
    this.wishlist.privacy = this.selectedPrivacy[0];

    this._wishlistService.update(this.wishlist).subscribe(
      item => {
        if (item) {
          this._activityLogService.addUpdate(
            `Updated wishlist ${item._id}`
          );
          this._notificationService.smallBox({
            title: 'Wishlist Updated',
            content: 'Wishlist has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
        } else {
          this._activityLogService.addError('No wishlist present: Update Faile');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'No wishlist returned which means that wishlist was not updated',
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

  /**
   * Validate the item
   */
  private validate(): boolean {
    return this._factory.validate(this.wishlist, this.displayErrors);
  }
}
