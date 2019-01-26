
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../core/services/notification.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

import { User } from '../../../../core/services/models/userInfo.interface';
import { UsersService } from '../shared/users.service';
import { UserFactory } from './../shared/user.factory';

import { RoleService } from './../../roles/shared/role.service';
import { ApplicationService } from '../../../account/applications/shared/application.service';
import { IRole } from './../../roles/shared/IRole';
import { IToken } from '../../tokens/shared/IToken';
import { Application } from './../../applications/shared/application.interface';
import * as moment from 'moment';

@Component({
  selector: 'marasco-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //////////////////Private variables///////////
  private _applications: Application[];

  private _addressesModel = [
    { address: '', city: '', state: '', zip: '' },
    { address: '', city: '', state: '', zip: '' }
  ];
  private _roles: IRole[];
  //\\\END Private variables ////////

  //////////////////Publicly exposed variables///////////
  public applicationOptions = [];
  public defaultUser: User = {
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

  public dropdownSettings = {};
  public dropdownSettingsApplication = {};
  public isUpdate = true;
  public options = [];
  public selectedApplication = [];
  public state: any = {
    tabs: {
      demo1: 0
    }
  };
  public tokens: IToken[] = [];
  public optionsTokenTable : any = {};
  public user: User = this.defaultUser;

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

  // @Input() filter = "ion ([7-9]|[1][0-2])";
  @Input() filter = '';

  @ViewChild('userDetailsForm') userDetailsForm;

  constructor(
    private _userService: UsersService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: UserFactory,
    private _roleService: RoleService,
    private _applicationService: ApplicationService,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  public disableUser() { }

  /////////////////////////////////////
  // Events
  /////////////////////////////////////

  ngOnInit() {

    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.user = this._route.snapshot.data['user'];
      this.selectedApplication.push(this.user.applicationId);
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  onItemSelect(item: any) {
    // Clear out current user roles
    //console.log(item);

  }

  onSelectAll(items: any) {
    //console.log(items);
  }

  /////////////////////////////////////
  // Public Metods
  /////////////////////////////////////

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
    this.activateTokenTable();
    this.getRoles();
    this.getApplications();
    this.getTokens();

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All Roles',
      unSelectAllText: 'UnSelect All Roles',
      itemsShowLimit: 20,
      allowSearchFilter: true
    };

    this.dropdownSettingsApplication = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
      allowSearchFilter: true
    };

    this._addressesModel.forEach((address, index) => {
      if (this.user.addresses && this.user.addresses[index]) {
      } else {
        this.user.addresses[index] = this._addressesModel[index];
      }
    });
  }

  private activateTokenTable() {
    const that = this;
    this.optionsTokenTable = {
      dom: 'Bfrtip',
      data: this.user.tokens,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'origin' },
        { data: 'expiresIn', title: 'Expires In' },
        {
          data: 'dateExpire', title: 'Expires',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
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
        'excel',
        'pdf',
        'print',
        {
          text: 'Delete All',
          action: function (e, dt, node, config) {
            //that._router.navigate(['/account/tokens/details/', 0]);
          },
          className: 'btn btn-primary'
        }
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

  private getApplications() {
    this._applicationService.all().subscribe(
      (applications: Application[]) => {
        this._applications = applications;
      },
      err => { },
      () => {
        // Init Dual List
        this.initDualListApplication();
      }
    );
  }

  private getRoles() {
    this._roleService.all().subscribe(
      (roles: IRole[]) => {
        this._roles = roles;
      },
      err => { },
      () => {
        // Init Dual List
        this.initDualListRole();
      }
    );
  }

  private getTokens() {
    this._userService.tokens(this.user._id).subscribe(
      (tokens: IToken[]) => {
        this.tokens = tokens;
      },
      err => { },
      () => {
      }
    );
  }
  private initDualListApplication(): void {
    const applicationOptions: any[] = [];

    this._applications.forEach((application, index) => {
      applicationOptions.push({
        _id: application._id,
        name: application.name
      });
    });

    this.applicationOptions = applicationOptions;
  }

  private initDualListRole(): void {
    const roleOptions: any[] = [];

    this._roles.forEach((role, index) => {
      roleOptions.push({
        _id: role._id,
        name: role.name
      });
    });

    this.options = roleOptions;
  }

  /**
   * Insert an item in the database
   */
  private insert() {
    this.user.applicationId = this.selectedApplication[0]._id;
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
    this.user.applicationId = this.selectedApplication[0]._id;
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
