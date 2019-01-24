
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { IUser } from './../shared/IUser';
import { UserService } from './../shared/user.service';
import { UserFactory } from './../shared/user.factory';

import { RoleService } from './../../roles/shared/role.service';
import { IRole } from './../../roles/shared/IRole';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'marasco-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //////////////////Publicly exposed variables///////////
  private _roles: IRole[];

  private _addressesModel = [
    { address: '', city: '', state: '', zip: '' },
    { address: '', city: '', state: '', zip: '' }
  ];

  //////////////////Publicly exposed variables///////////
  public isUpdate = true;

  public state: any = {
    tabs: {
      demo1: 0
    }
  };

  public defaultUser: IUser = {
    _id: '',
    avatar: '',
    firstName: '',
    lastName: '',
    dateCreated: null,
    email: '',
    homePhone: '',
    username: '',
    addresses: this._addressesModel,
    password: '',
    confirmPassword: '',
    roles: []
  };

  public user: IUser = this.defaultUser;

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

  @Input() options = [];;
  // @Input() filter = "ion ([7-9]|[1][0-2])";
  @Input() filter = '';

  @ViewChild('userDetailsForm') userDetailsForm;

  onRolesChange() {
    console.log('options', this.options);
    // Clear out current user roles
    this.user.roles = [];

    this.options.forEach((item, key) => {
      if (item.selected) {
        this.user.roles.push({
          _id: item.key,
          name: item.value,
          normalizedName: this._upperCasePipe.transform(item.value)
        });
      }
    });
  }

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: UserFactory,
    private _roleService: RoleService,
    private _upperCasePipe: UpperCasePipe,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  public disableUser() { }

  ngOnInit() {

    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.user = this._route.snapshot.data['user'];
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  public save(userDetailsForm: any) {
    if (this.validate()) {
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public toList() {
    this._router.navigate(['/account/users']);
  }

  /////////////////////////////////////
  // Private Metods
  /////////////////////////////////////
  /**
   * Activate the component
   */
  private activate() {
    this.getRoles();

    this._addressesModel.forEach((address, index) => {
      if (this.user.addresses && this.user.addresses[index]) {
      } else {
        this.user.addresses[index] = this._addressesModel[index];
      }
    });
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

  private getRoles() {
    this._roleService.all().subscribe(
      (roles: IRole[]) => {
        this._roles = roles;
      },
      err => { },
      () => {
        // Init Dual List
        this.initDualList();
      }
    );
  }

  private initDualList(): void {
    const roleOptions: any[] = [];

    this._roles.forEach((role, index) => {
      let roleSelected = false;

      for (let i = 0; i < this.user.roles.length; i++) {
        if (this.user.roles[i]._id === role._id) {
          roleSelected = true;
        }
      }

      roleOptions.push({
        key: role._id,
        value: role.name,
        selected: roleSelected
      });
    });

    this.options = roleOptions;
  }

  /**
   * Insert an item in the database
   */
  private insert() {

    this._userService.insert(this.user).subscribe(
      user => {
        if (user) {
          this._activityLogService.addInserts(
            `Inserted user ${user._id}`
          );
          this._notificationService.smallBox({
            title: 'User created',
            content: 'User has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
          this.isUpdate = true;
          this.user._id = user._id;
        } else {
          this._activityLogService.addError('User not returned from database on insert');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'User was not returned indicating that user was not in fact updated',
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
    this._userService.update(this.user).subscribe(
      user => {
        if (user) {
          this._activityLogService.addUpdate(
            `Updated user ${user._id}`
          );
          this._notificationService.smallBox({
            title: 'User Updated',
            content: 'User has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
        } else {
          this._activityLogService.addError('No user present: Update Faile');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'No user returned which means that user was not updated',
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
    return this._factory.validate(this.user, this.displayErrors);
  }
}
