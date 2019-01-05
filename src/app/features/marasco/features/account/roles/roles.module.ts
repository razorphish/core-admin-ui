import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { AuthHttpService } from '../../../core/services/auth-http.service';
import {
  RolesRoutingModule,
  RolesComponent,
  RoleService,
  RoleFactory,
  RoleListComponent,
  RoleListResolve,
  RoleComponent,
  RoleResolve
} from '../roles';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    RolesRoutingModule
  ],
  declarations: [RolesComponent, RoleListComponent, RoleComponent],
  providers: [
    RoleService,
    RoleListResolve,
    RoleResolve,
    RoleFactory,
    UpperCasePipe,
    AuthHttpService
  ]
})
export class RolesModule { }
