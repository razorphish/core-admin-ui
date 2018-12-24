import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { RegisterComponent, RegisterRoutingModule } from '../register';

import {
  UserService
} from '../../account/users'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterComponent],
  providers: [
    UserService
  ]
})
export class RegisterModule { }
