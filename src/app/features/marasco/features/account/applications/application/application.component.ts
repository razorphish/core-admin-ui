import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { MarascoNotification } from './../../../../core/interfaces/NotificationOptions.interface';
import { IApplicationSettings } from './../shared/application-settings.interface';

// Third Party Services
import { NotificationService } from '../../../../core/services/notification.service';

// Internal
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';
import { IApplication } from '../shared/application.interface';

import {
  ApplicationFactory,
  ApplicationService,
  ApplicationSettingsService
} from './../shared/';

import { HttpErrorResponse } from '@angular/common/http';
import { MarascoEmailNotification } from '@app/features/marasco/core/interfaces/NotificationOptions.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';

@Component({
  selector: 'marasco-application',
  templateUrl: 'application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  ////////////////// Publicly exposed variables ///////////

  ////////////////// Publicly exposed variables ///////////
  public defaultItem: IApplication = {
    name: '',
    settings: {
      applicationId: '',
      emailNotifications: null,
      notifications: null
    }
  };

  public emailNotification: MarascoEmailNotification = {
    html: ''
  };
  public notification: MarascoNotification = {};

  public action: any = {};

  public Editor = ClassicEditor;

  public editorConfig = {
    placeholder: 'what up',
    height: 300
  };

  public optionsEmailTable: any = {};
  public optionsNotificationTable: any = {};
  public actionOptions: any = {};

  public isUpdate = true;

  public application: IApplication = this.defaultItem;

  public state: any = {
    tabs: {
      demo1: 0
    }
  };

  public settingsCreated: boolean = false;
  public notificationsCreated: boolean = false;

  public statusOptions = [
    {
      _id: 'active',
      name: 'active'
    },
    {
      _id: 'inactive',
      name: 'inactive'
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
    }
  ];
  // active', 'inactive', 'disabled', 'pending', 'archived

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true
      },
      shortName: {
        required: true
      },
      url: {
        required: true
      },
      statusId: {
        required: true
      },
      forgotPasswordSubject: {
        required: true
      }
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter a name for the application'
      },
      shortName: {
        required: 'Please enter a short name'
      },
      url: {
        required: 'Please enter a url'
      },
      statusId: {
        required: 'Please enter a status Id'
      },
      forgotPasswordSubject: {
        required: 'Please enter subject'
      }
    }
  };

  public validationOptionsNotification: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true
      },
      userId: {
        required: true
      },
      statusId: {
        required: true
      }
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter your name'
      },
      wishlistId: {
        required: 'Please enter a wishlist'
      },
      statusId: {
        required: 'Please enter a status'
      }
    }
  };

  public validationOptions3: any = {
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

  public selectedStatus = [];
  public dropdownSettingsStatus = {};

  @ViewChild('applicationDetailsForm') applicationDetailsForm;
  @ViewChild('emailForm') emailForm;
  @ViewChild('notificationForm') notificationForm;

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @ViewChild('lgEmailModal') public lgEmailModal: ModalDirective;
  @ViewChild('smModal') public smModal: ModalDirective;

  public constructor(
    private _applicationService: ApplicationService,
    private _applicationSettingsService: ApplicationSettingsService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: ApplicationFactory,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.application = Object.assign(
        this.defaultItem,
        this._route.snapshot.data['application']
      );
      this.selectedStatus.push(this.application.statusId);
      if (!!this.application.settings && this.application.settings._id) {
        this.settingsCreated = true;
      } else {
        this.application.settings = {
          applicationId: '',
          emailNotifications: [],
          notifications: []
        };
      }
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  public showNotificationChildModal(data?: any): void {
    if (!!data) {
      this.notification = data;
      this.notificationsCreated = true;
      this.actionOptions.data = this.notification.actions;
    } else {
      this.notification = {};
      this.actionOptions.data = {};
    }
    this.lgModal.show();
  }

  public showChildEmailModal(data?: any): void {
    if (!!data) {
      this.emailNotification = data;
      if (!data.html) {
        data.html = '';
      }
    } else {
      this.emailNotification = {
        html: ''
      };
    }

    this.lgEmailModal.show();
  }

  public hideChildModal(): void {
    this.lgModal.hide();
  }

  public hideEmailChildModal(): void {
    this.lgEmailModal.hide();
  }

  public showGrandchildModal(action: any): void {
    this.action = action;
    this.smModal.show();
  }

  public hideGrancchildModal(): void {
    this.lgModal.hide();
  }

  public save(applicationDetailsForm: any) {
    if (this.validate()) {
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public saveSettings() {
    if (!this.application.settings._id) {
      this.insertSettings();
    }
  }

  public saveEmailNotification(body: any) {
    if (this.emailNotification._id) {
      this.updateEmailNotification();
    } else {
      this.insertEmailNotification();
    }
  }

  public saveNotification(body: any) {
    if (this.notification._id) {
      this.updateNotification();
    } else {
      this.insertNotification();
    }
  }

  public saveNotificationAction(body: any) {
    if (this.action._id) {
      this.updateNotificationAction();
    } else {
      this.insertNotificationAction();
    }
  }

  public toList() {
    this._router.navigate(['/account/applications']);
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

    this.activateDataTables();
  }

  private activateDataTables() {
    const that = this;
    this.optionsEmailTable = {
      dom: 'Bfrtip',
      data: this.application.settings.emailNotifications,
      pageLength: 5,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name' },
        { data: 'subject', title: 'Subject' },
        { data: 'fromEmailAddress', title: 'From' },
        { data: 'text', title: 'Text', defaultContent: '' },
        { data: 'html', title: 'Html', defaultContent: '' },
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
          action({ e, dt, node, config }: { e; dt; node; config }) {
            that.showChildEmailModal();
          },
          className: 'btn btn-primary'
        }
      ],
      rowCallback: (row: Node, data: any[] | object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          self.showChildEmailModal(data);
        });
        return row;
      }
    };

    this.optionsNotificationTable = {
      dom: 'Bfrtip',
      data: this.application.settings.notifications,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name' },
        { data: 'title', title: 'Title' },
        { data: 'dir', title: 'Dir', defaultContent: '' },
        { data: 'lang', title: 'Language' },
        { data: 'body', title: 'Body' },
        { data: 'tag', title: 'Tag' },
        { data: 'vibrate', title: 'Vibrate' },
        {
          data: 'dateCreated',
          render: (
            data: moment.MomentInput,
            type: any,
            row: any,
            meta: any
          ) => {
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
          action({ e, dt, node, config }: { e; dt; node; config }) {
            that.showNotificationChildModal();
          },
          className: 'btn btn-primary'
        }
      ],
      rowCallback: (row: Node, data: any[] | object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          self.showNotificationChildModal(data);
        });
        return row;
      }
    };

    this.actionOptions = {
      searching: false,
      paging: false,
      info: false,
      columns: [
        { data: '_id', title: 'Id', visible: false },
        { data: 'action', title: 'Action', defaultContent: '' },
        { data: 'title', title: 'Title', defaultContent: '' },
        { data: 'icon', title: 'Icon', defaultContent: '' }
      ],
      buttons: [
        {
          text: 'Create',
          action({ e, dt, node, config }: { e; dt; node; config }) {
            that.showGrandchildModal(dt);
          },
          className: 'btn btn-primary'
        }
      ],
      rowCallback: (row: Node, data: any[] | object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          self.showGrandchildModal(data);
        });
        return row;
      }
    };
  }

  /**
   * Display Validation Errors
   * @param errors Array: of error strings
   */
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
   * Insert an application
   */
  private insert() {
    this.application.statusId = this.selectedStatus[0];
    this._applicationService.insert(this.application).subscribe(
      (application) => {
        if (application) {
          this._activityLogService.addInserts(
            `Inserted user ${application._id}`
          );
          this._notificationService.smallBox({
            title: 'Application created',
            content: 'Application has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
          this.isUpdate = true;
          this.application._id = application._id;
        } else {
          this._activityLogService.addError(
            'application not returned indicating a fail to insert'
          );
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'Insert application did not complete successfully',
            color: '#C46A69',
            icon: 'fa fa-warning shake animated',
            number: '1',
            timeout: 6000 // 6 seconds
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
  private insertEmailNotification() {
    this._applicationSettingsService
      .insertEmailNotification(
        this.application.settings._id,
        this.emailNotification
      )
      .subscribe(
        (emailNotification) => {
          if (emailNotification) {
            this._activityLogService.addInserts(
              `Inserted email notification ${emailNotification._id}`
            );

            this._notificationService.smallBox({
              title: 'Email notification created',
              content: 'Email notification has been created successfully. ',
              color: '#739E73',
              timeout: 4000,
              icon: 'fa fa-check',
              number: '4'
            });
            this._pageRefresh();
          } else {
            this._activityLogService.addError(
              'Email notification not returned indicating a fail to insert'
            );
            this._notificationService.bigBox({
              title: 'Oops! the database has returned an error',
              content:
                'Insert email notification did not complete successfully',
              color: '#C46A69',
              icon: 'fa fa-warning shake animated',
              number: '1',
              timeout: 6000 // 6 seconds
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
  private insertNotification() {
    this._applicationSettingsService
      .insertNotification(this.application.settings._id, this.notification)
      .subscribe(
        (notification) => {
          if (notification) {
            this._activityLogService.addInserts(
              `Inserted notification ${notification._id}`
            );

            this._notificationService.smallBox({
              title: 'Notification created',
              content: 'Notification has been created successfully. ',
              color: '#739E73',
              timeout: 4000,
              icon: 'fa fa-check',
              number: '4'
            });

            this._pageRefresh();
          } else {
            this._activityLogService.addError(
              'Notification not returned indicating a fail to insert'
            );
            this._notificationService.bigBox({
              title: 'Oops! the database has returned an error',
              content: 'Insert notification did not complete successfully',
              color: '#C46A69',
              icon: 'fa fa-warning shake animated',
              number: '1',
              timeout: 6000 // 6 seconds
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
            timeout: 6000 // 6 seconds
          });
        },
        () => {
          // Clean up
        }
      );
  }

  private insertNotificationAction() {
    this._applicationSettingsService
      .insertNotificationAction(
        this.application.settings._id,
        this.notification._id,
        this.action
      )
      .subscribe(
        (notificationAction) => {
          this._activityLogService.addUpdate(
            `Insert notification action ${this.action._id}`
          );
          this._notificationService.smallBox({
            title: 'Notification action inserted',
            content: 'Notificaiton action has been inserted successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });

          this._pageRefresh();
        },
        (error) => {
          this.displayServerErrors(error);
        }
      );
  }

  /**
   * Insert an application
   */
  private insertSettings() {
    const applicationSettings: IApplicationSettings = {
      applicationId: this.application._id
    };

    this._applicationSettingsService.insert(applicationSettings).subscribe(
      (as) => {
        if (as) {
          this._activityLogService.addInserts(
            `Inserted new application settings ${as._id}`
          );
          this._notificationService.smallBox({
            title: 'Application Settings created',
            content: 'Application settings has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
          this.application.settings._id = as._id;
          this.settingsCreated = true;
        } else {
          this._activityLogService.addError(
            'Application settings not returned indicating a fail to insert'
          );
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content:
              'Insert application settings did not complete successfully',
            color: '#C46A69',
            icon: 'fa fa-warning shake animated',
            number: '1',
            timeout: 6000 // 6 seconds
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
          timeout: 6000 // 6 seconds
        });
      },
      () => {
        // Clean up
      }
    );
  }

  /**
   * Update application
   */
  private update() {
    this.application.statusId = this.selectedStatus[0];
    this._applicationService.update(this.application).subscribe(
      (application) => {
        if (application) {
          this._activityLogService.addUpdate(`Updated user ${application._id}`);
          this._notificationService.smallBox({
            color: '#739E73',
            content: 'The application has been updated successfully. ',
            icon: 'fa fa-check',
            number: '4',
            timeout: 4000,
            title: 'Application Updated'
          });
        } else {
          this._activityLogService.addError(
            'Update did not return a application indicating a fail to update in database'
          );
          this._notificationService.bigBox({
            color: '#C46A69',
            content: 'Application failed to update',
            icon: 'fa fa-warning shake animated',
            number: '1',
            timeout: 6000, // 6 seconds
            title: 'Oops! the database has returned an error'
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
          timeout: 6000 // 6 seconds
        });
      },
      () => {
        // Clean up
      }
    );
  }

  private updateEmailNotification() {
    this._applicationSettingsService
      .updateEmailNotification(
        this.application.settings._id,
        this.emailNotification._id,
        this.emailNotification
      )
      .subscribe(
        (emailNotification) => {
          // this.applicationSettings = applicationSettings;

          this._activityLogService.addUpdate(
            `Updated email notification ${this.action._id}`
          );

          this._notificationService.smallBox({
            title: 'Email Notification Updated',
            content: 'Email Notificaiton has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });

          this._pageRefresh();
        },
        (error) => {
          this.displayServerErrors(error);
        }
      );
  }

  private updateNotification() {
    this.notification.vibrate = this.notification.vibrate.toString().split(',');

    this._applicationSettingsService
      .updateNotification(
        this.application.settings._id,
        this.notification._id,
        this.notification
      )
      .subscribe(
        (notification) => {
          // this.applicationSettings = applicationSettings;

          this._activityLogService.addUpdate(
            `Updated notification ${this.action._id}`
          );
          this._notificationService.smallBox({
            title: 'Notification Updated',
            content: 'Notificaiton has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });

          this._pageRefresh();
        },
        (error) => {
          this.displayServerErrors(error);
        }
      );
  }

  private updateNotificationAction() {
    this._applicationSettingsService
      .updateNotificationAction(
        this.application.settings._id,
        this.notification._id,
        this.action._id,
        this.action
      )
      .subscribe(
        (notificationAction) => {
          // this.applicationSettings = applicationSettings;

          this._activityLogService.addUpdate(
            `Updated notification action ${this.action._id}`
          );
          this._notificationService.smallBox({
            title: 'Notification action Updated',
            content: 'Notificaiton action has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });

          this._pageRefresh();
        },
        (error) => {
          this.displayServerErrors(error);
        }
      );
  }

  private _pageRefresh() {
    this._router
      .navigateByUrl('/account', { skipLocationChange: false })
      .then(() =>
        this._router.navigate([
          `/account/applications/details/${this.application._id}`
        ])
      );
  }
  /**
   * Validate the item
   */
  private validate(): boolean {
    return this._factory.validate(this.application, this.displayErrors);
  }
}
