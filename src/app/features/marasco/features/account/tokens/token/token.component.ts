
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { IToken } from './../shared/IToken';
import { TokenService } from './../shared/token.service';
import { TokenFactory } from './../shared/token.factory';

import { RoleService } from '../../roles/shared/role.service';
import { IRole } from '../../roles/shared/IRole';

@Component({
  selector: 'marasco-token',
  templateUrl: 'token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  //////////////////Private variables///////////

  //////////////////Publicly exposed variables///////////
  public isUpdate = true;

  public state: any = {
    tabs: {
      demo1: 0
    }
  };

  public defaultToken: IToken = {
    _id: '',
    userId: null,
    loginProvider: '',
    name: '',
    value: '',
    scope: '',
    type: '',
    protocol: '',
    expiresIn: 0
  };

  public token: IToken = this.defaultToken;


  @ViewChild('tokenDetailsForm') tokenDetailsForm;

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      username: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: false,
        minlength: 3,
        maxlength: 20
      },
      passwordConfirm: {
        required: false,
        minlength: 3,
        maxlength: 20,
        equalTo: '#password'
      }
    },

    // Messages for form validation
    messages: {
      username: {
        required: 'Please enter your username'
      },
      email: {
        required: 'Please enter your email address',
        email: 'Please enter a VALID email address'
      },
      password: {
        required: 'Please enter your password'
      },
      passwordConfirm: {
        required: 'Please enter your password one more time',
        equalTo: 'Please enter the same password as above'
      }
    }
  };


  constructor(
    private _TokenService: TokenService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: TokenFactory,
    private _roleService: RoleService,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  public deleteToken() { }

  ngOnInit() {

    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.token = this._route.snapshot.data['token'];
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  public save(tokenDetailsForm: any) {
    if (this.validate()) {
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public toList() {
    this._router.navigate(['/account/tokens']);
  }

  /////////////////////////////////////
  // Private Metods
  /////////////////////////////////////
  /**
   * Activate the component
   */
  private activate() {

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

    this._TokenService.insert(this.token).subscribe(
      token => {
        if (token) {
          this._activityLogService.addInserts(
            `Inserted Token ${token._id}`
          );
          this._notificationService.smallBox({
            title: 'Token created',
            content: 'Token has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
          this.isUpdate = true;
          this.token._id = token._id;
        } else {
          this._activityLogService.addError('Token not returned from database on insert');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'Token was not returned indicating that Token was not in fact updated',
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
    this._TokenService.update(this.token).subscribe(
      token => {
        if (token) {
          this._activityLogService.addUpdate(
            `Updated Token ${token._id}`
          );
          this._notificationService.smallBox({
            title: 'Token Updated',
            content: 'Token has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
        } else {
          this._activityLogService.addError('No Token present: Update Faile');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'No Token returned which means that Token was not updated',
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
    return this._factory.validate(this.token, this.displayErrors);
  }
}
