
import { Component, OnInit, ViewChild } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Third Party Services
import { NotificationService } from '../../../../core/services/notification.service';

// Internal
import { ApplicationService } from './../shared/application.service';
import { Application } from '../shared/application.interface';
import { ApplicationFactory } from './../shared/application.factory';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Component({
  selector: 'marasco-application',
  templateUrl: 'application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  //////////////////Publicly exposed variables///////////

  //////////////////Publicly exposed variables///////////
  public defaultItem: Application = {
    name: ''
  };

  public isUpdate = true;

  public application: Application = this.defaultItem;

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
    }
  ]
  //active', 'inactive', 'disabled', 'pending', 'archived

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
        required: 'Please enter a name for the application'
      }
    }
  };

  public selectedStatus = [];
  public dropdownSettingsStatus = {};

  @ViewChild('applicationDetailsForm') applicationDetailsForm;

  constructor(
    private _applicationService: ApplicationService,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _router: Router,
    private _factory: ApplicationFactory,
    private _upperCasePipe: UpperCasePipe,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  ngOnInit() {

    const id = this._route.snapshot.params['id'];
    if (id !== '0') {
      this.application = this._route.snapshot.data['application'];
      this.selectedStatus.push(this.application.statusId);
    } else {
      this.isUpdate = false;
    }

    this.activate();
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

  /**
   * Insert an item in the database
   */
  private insert() {
    this.application.statusId = this.selectedStatus[0];
    this._applicationService.insert(this.application).subscribe(
      application => {
        if (application) {
          this._activityLogService.addInserts(`Inserted user ${application._id}`)
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
          this._activityLogService.addError('application not returned indicating a fail to insert');
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
    this.application.statusId = this.selectedStatus[0];
    this._applicationService.update(this.application).subscribe(
      application => {
        if (application) {
          this._activityLogService.addUpdate(`Updated user ${application._id}`);
          this._notificationService.smallBox({
            title: 'Application Updated',
            content: 'The application has been updated successfully. ',
            color: '#739E73',
            timeout: 4000,
            icon: 'fa fa-check',
            number: '4'
          });
        } else {
          this._activityLogService.addError('Update did not return a application indicating a fail to update in database');
          this._notificationService.bigBox({
            title: 'Oops! the database has returned an error',
            content: 'Application failed to update',
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
    return this._factory.validate(this.application, this.displayErrors);
  }
}
