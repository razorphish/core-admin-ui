import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ApplicationService } from '../../account/applications/shared';

import {
  //Core Subscription Iser Components
  SubscriptionUsersComponent,
  SubscriptionUsersRoutingModule,
  SubscriptionUserListComponent,
  SubcriptionUserComponent,
  SubscriptionUserResolve,
  SubscriptionUserListResolve,
  SubscriptionUserGuard,

  //Subscription User
  SubscriptionUserService,
  SubscriptionUserFactory
} from '.';
import { SubscriptionPlanService } from '../plans';
import { UsersService } from '../../account/users';

@NgModule({
  imports: [
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    SubscriptionUsersRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [],
  declarations: [
    SubscriptionUsersComponent,
    SubscriptionUserListComponent,
    SubcriptionUserComponent
  ],
  providers: [
    SubscriptionPlanService,
    SubscriptionUserService,
    SubscriptionUserGuard,
    SubscriptionUserResolve,
    SubscriptionUserListResolve,
    SubscriptionUserFactory,

    UpperCasePipe,
    ApplicationService,
    UsersService
  ]
})
export class SubscriptionUsersModule {}
