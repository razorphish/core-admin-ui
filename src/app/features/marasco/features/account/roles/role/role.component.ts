
import { Component, OnInit, ViewChild } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Third Party Services
import { NotificationService } from '../../../../core/services/notification.service';

// Internal
import { RoleService } from './../shared/role.service';
import { IRole } from './../shared/IRole';
import { RoleFactory } from './../shared/role.factory';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Component({
  selector: 'marasco-role',
  templateUrl: 'role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  //////////////////Publicly exposed variables///////////

  //////////////////Publicly exposed variables///////////
  public defaultItem: IRole = {
    name: ''
  };

  public isUpdate = true;

  public role: IRole = this.defaultItem;

  public validationOptions: any = {
    // Rules for form validation
    rules: {
      name: {
        required: true
      }
    },

    // Messages for form validation
    messages: {
      name: {
        required: 'Please enter a name for the role'
      }
    }
  };

  @ViewChild('roleDetailsForm') roleDetailsForm;

  constructor(
    private _roleService: RoleService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: RoleFactory,
    private _upperCasePipe: UpperCasePipe,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  ngOnInit() {

    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.role = this._route.snapshot.data['role'];
    } else {
      this.isUpdate = false;
    }

    this.activate();
  }

  public save(roleDetailsForm: any) {
    this.role.normalizedName = this._upperCasePipe.transform(this.role.name);
    if (this.validate()) {
      if (this.isUpdate) {
        this.update();
      } else {
        this.insert();
      }
    }
  }

  public toList() {
    this._router.navigate(['/account/roles']);
  }

  /////////////////////////////////////
  // Private Metods
  /////////////////////////////////////
  /**
   * Activate the component
   */
  private activate() {}

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

  /**
   * Insert an item in the database
   */
  private insert() {
    this._roleService.insert(this.role).subscribe(
      role => {
        if (role) {
          this._activityLogService.addInserts(`Inserted user ${role._id}`)
          this._notificationService.smallBox({
            title: 'Role created',
            content: 'Role has been created successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
          this.isUpdate = true;
          this.role._id = role._id;
        } else {
          this._activityLogService.addError('Role not returned indicating a fail to insert');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'Insert role did not complete successfully',
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
    this._roleService.update(this.role).subscribe(
      role => {
        if (role) {
          this._activityLogService.addUpdate(`Updated user ${role._id}`);
          this._notificationService.smallBox({
            title: 'Role Updated',
            content: 'User has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
        } else {
          this._activityLogService.addError('Update did not return a role indicating a fail to update in database');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'Role failed to update',
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
    return this._factory.validate(this.role, this.displayErrors);
  }
}
