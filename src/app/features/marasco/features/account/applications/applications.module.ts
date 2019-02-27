import { ApplicationsRoutingModule } from './applications-routing.module';

import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { ApplicationService } from './shared/application.service';
import {
  ApplicationsComponent,
  ApplicationComponent,
  ApplicationListComponent,
  ApplicationListResolve
} from '.';
import { ApplicationFactory } from './shared/application.factory';
import { ApplicationResolve } from './application/application.resolve';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    ApplicationsRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    ApplicationsComponent,
    ApplicationComponent,
    ApplicationListComponent
  ],
  providers: [
    ApplicationService,
    ApplicationFactory,
    ApplicationListResolve,
    ApplicationResolve,
    UpperCasePipe
  ]
})
export class ApplicationsModule { }
