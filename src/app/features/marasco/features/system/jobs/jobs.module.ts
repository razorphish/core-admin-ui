import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {
  JobsComponent,
  JobsRoutingModule,
  JobListComponent,
  JobComponent,
  JobsService,
  JobListResolve,
  JobResolve,
  JobGuard,
  JobFactory,
} from '../Jobs';

@NgModule({
  imports: [
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    JobsRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [],
  declarations: [JobsComponent, JobListComponent, JobComponent],
  providers: [
    JobsService,
    JobGuard,
    JobListResolve,
    JobResolve,
    JobFactory,
    UpperCasePipe,
  ],
})
export class JobsModule {}
