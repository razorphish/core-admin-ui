import { ApplicationsRoutingModule } from './applications-routing.module';

import { CommonModule, UpperCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmartadminEditorsModule } from '../../..//shared/forms/editors/smartadmin-editors.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';

import {
  ApplicationComponent,
  ApplicationListComponent,
  ApplicationListResolve,
  ApplicationsComponent,
  ApplicationSettingsService
} from '.';
import { ApplicationService } from './shared/application.service';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ApplicationResolve } from './application/application.resolve';
import { ApplicationFactory } from './shared/application.factory';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    ApplicationsRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    SmartadminEditorsModule,
    CKEditorModule
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
    UpperCasePipe,
    ApplicationSettingsService
  ]
})
export class ApplicationsModule { }
