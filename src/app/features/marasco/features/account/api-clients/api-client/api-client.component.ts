
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { IApiClient } from '../shared/IApiClient';
import { ApiClientService } from '../shared/api-client.service';
import { ApiClientFactory } from './../shared/api-client.factory';

@Component({
  selector: 'marasco-api-client',
  templateUrl: 'api-client.component.html',
  styleUrls: ['./api-client.component.css']
})

export class ApiClientComponent implements OnInit {
  //////////////////Private variables///////////

  //////////////////Publicly exposed variables///////////
  public isUpdate = true;

  public state: any = {
    tabs: {
      demo1: 0
    }
  };

  public tokenHash: string;

  public defaultApiClient: IApiClient = {
    _id: '',
    name: '',
    clientId: '',
    clientSecret: '',
    dateCreated: null,
    isTrusted: false,
    applicationType: '',
    allowedOrigins: [],
    tokenLifeTime: 0,
    refreshTokenLifeTime: 0
  };

  public apiClient: IApiClient = this.defaultApiClient;

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true
      },
      clientId: {
        required: true
      },
      clientSecret: {
        required: false
      },
      isTrusted: {
        required: false
      },
      applicationType: {
        required: false
      },
      allowedOrigins: {
        required: false
      },
      tokenLifeTime: {
        required: false
      },
      refreshTokenLifeTime: {
        required: false
      }
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter a name for the client'
      },
      clientId: {
        required: 'Please enter a client Id'
      },
      clientSecret: {
        required: 'Please enter your password'
      },
      isTrusted: {
        required: 'Please enter trust'
      },
      applicationType: {
        required: 'Please enter application type'
      },
      allowedOrigins: {
        required: 'Please enter allowed origin(s) "*" for all'
      },
      tokenLifeTime: {
        required: 'Please enter token life time in minutes'
      },
      refreshTokenLifeTime: {
        required: 'Please enter refresh token life time in minutes'
      }
    }
  };

  @Input() options;
  // @Input() filter = "ion ([7-9]|[1][0-2])";
  @Input() filter = '';

  @ViewChild('apiClientDetailsForm') apiClientDetailsForm;

  constructor(
    private _ApiClientService: ApiClientService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: ApiClientFactory,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  ngOnInit() {
    console.log('marasco-api-client-details Init');

    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.apiClient = this._route.snapshot.data['apiClient'];
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  public save(apiClientDetailsForm: any) {
    this.apiClient.allowedOrigins = this.apiClient.allowedOrigins.join(',');
    if (this.validate()) {
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public rt() {
    this.refreshToken();
  }

  public toList() {
    this._router.navigate(['/marasco/account/api-clients']);
  }

  /////////////////////////////////////
  // Private Metods
  /////////////////////////////////////
  /**
   * Activate the component
   */
  private activate() { }

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
    this._ApiClientService.insert(this.apiClient).subscribe(
      response => {
        if (response.status) {
          this._activityLogService.addInserts(
            `Inserted api client ${response.data._id}`
          );
          this._notificationService.smallBox({
            title: 'apiClient created',
            content: 'apiClient has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
          this.isUpdate = true;
          this.apiClient._id = response.data._id;
        } else {
          this._activityLogService.addError(response.error);
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: response.msg,
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
   * Refreshes client token
   */
  private refreshToken() {
    this._ApiClientService.refreshToken(this.apiClient._id).subscribe(
      response => {
        if (response.status) {

          // Set client correctly
          this.apiClient.clientSecret = response.data.clientSecret;
          this.tokenHash = response.data.tokenHash

          this._activityLogService.addInserts(
            `Refreshed api client ${this.apiClient._id} token`
          );
          this._notificationService.smallBox({
            title: 'Token Successful',
            content: `Client token has been refreshed successfully. Copy and paste the data for your records`,
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
        } else {
          this._activityLogService.addError(response.error);
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: response.msg,
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
          title: 'Oops!  there is an issue with the call to refresh token',
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
   * Update item
   */
  private update() {
    this._ApiClientService.update(this.apiClient).subscribe(
      response => {
        if (response.status) {
          this._activityLogService.addInserts(
            `Inserted api client ${response.data._id}`
          );
          this._notificationService.smallBox({
            title: 'apiClient Updated',
            content: 'apiClient has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
        } else {
          this._activityLogService.addError(response.error);
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: response.msg,
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
    return this._factory.validate(this.apiClient, this.displayErrors);
  }
}
