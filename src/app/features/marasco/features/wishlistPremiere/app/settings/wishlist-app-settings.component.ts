
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { WishlistAppSettings } from '../shared/WishlistAppSettings.interface';
import { WishlistAppService } from '../shared/wishlist-app-service';

import * as moment from 'moment';

@Component({
  selector: 'marasco-wishlist-app-settings',
  templateUrl: 'wishlist-app-settings.component.html',
  styleUrls: ['./wishlist-app-settings.component.css']
})
export class WishlistAppSettingsComponent implements OnInit {
  //////////////////Private variables///////////


  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
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

  public selectedStatus = [];

  private _defaultWishlistAppSettings: WishlistAppSettings = {

  };

  public dropdownSettingsStatus = {};
  public isUpdate = true;
  public notification : any = {};
  public options = [];
  public state: any = {
    tabs: {
      demo1: 0
    }
  };

  public optionsTokenTable: any = {};
  public optionsNotificationTable: any = {};
  public wishlistAppSettings: WishlistAppSettings = this._defaultWishlistAppSettings;

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

  public validationOptions2: any = {
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
  @ViewChild('wishlistAppNotificationForm') wishlistAppNotificationForm;

  constructor(
    private _wishlistAppService: WishlistAppService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  /////////////////////////////////////
  // Events
  /////////////////////////////////////

  ngOnInit() {


    this.wishlistAppSettings = this._route.snapshot.data['wishlistAppSettings'][0];

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

  @ViewChild('lgModal') public lgModal: ModalDirective;

  public showChildModal(data:any): void {
    this.notification = data;
    console.log(this.notification);
    this.lgModal.show();
  }

  public hideChildModal(): void {
    this.lgModal.hide();
  }

  public save(wishlistDetailsForm: any) {
    //if (this.validate()) {
    this.update();
    //}
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

    this.optionsNotificationTable = {
      dom: 'Bfrtip',
      data: this.wishlistAppSettings.notifications,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name' },
        { data: 'title', title: 'Title' },
        { data: 'dir', title: 'Dir' },
        { data: 'lang', title: 'Language' },
        { data: 'body', title: 'Body' },
        { data: 'tag', title: 'Tag' },
        { data: 'vibrate', title: 'Vibrate' },
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
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          self.showChildModal(data);
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

  /**
   * Update item
   */
  private update() {
    this._wishlistAppService.update(this.wishlistAppSettings).subscribe(
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
  // private validate(): boolean {
  //   return this._factory.validate(this.wishlist, this.displayErrors);
  // }
}
