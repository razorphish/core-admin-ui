import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ApplicationService } from '../../account/applications/shared';

import {
  //Core Subscription Components
  SubscriptionPlansComponent,
  SubscriptionPlansRoutingModule,
  SubscriptionPlanListComponent,
  SubcriptionPlanComponent,
  SubscriptionPlanResolve,
  SubscriptionPlanListResolve,
  SubscriptionPlanGuard,

  //Subscription Plans
  SubscriptionPlanService,
  SubscriptionPlanFactory,
  SubscriptionItemService,
  SubscriptionItemFactory,
} from '.';

import { 
    //Subscription Users
    SubscriptionUserFactory
} from '../users/shared/'

@NgModule({
  imports: [
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    SubscriptionPlansRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [],
  declarations: [
    SubscriptionPlansComponent,
    SubscriptionPlanListComponent,
    SubcriptionPlanComponent
  ],
  providers: [
    SubscriptionPlanService,
    SubscriptionPlanGuard,
    SubscriptionPlanResolve,
    SubscriptionPlanListResolve,
    SubscriptionPlanFactory,

    SubscriptionItemService,
    SubscriptionItemFactory,

    SubscriptionUserFactory,

    UpperCasePipe,
    ApplicationService
  ]
})
export class SubscriptionPlansModule {}
