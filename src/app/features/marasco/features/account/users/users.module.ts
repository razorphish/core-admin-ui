import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { RoleService } from '../roles';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {
  UsersComponent,
  UsersRoutingModule,
  UserListComponent,
  UserComponent,
  UsersService,
  UserListResolve,
  UserResolve,
  UserGuard,
  UserFactory
} from '../users';

@NgModule({
  imports: [
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    UsersRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [],
  declarations: [UsersComponent, UserListComponent, UserComponent],
  providers: [
    UsersService,
    UserGuard,
    UserListResolve,
    UserResolve,
    UserFactory,
    RoleService,
    UpperCasePipe
  ]
})
export class UsersModule { }
