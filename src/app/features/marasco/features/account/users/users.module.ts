import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { RoleService } from '../roles';
import { AuthHttpService } from '../../../core/services/auth-http.service';

import {
  UsersComponent,
  UsersRoutingModule,
  UserListComponent,
  UserComponent,
  UserService,
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
    UsersRoutingModule
  ],
  exports: [],
  declarations: [UsersComponent, UserListComponent, UserComponent],
  providers: [
    UserService,
    UserGuard,
    UserListResolve,
    UserResolve,
    UserFactory,
    RoleService,
    UpperCasePipe,
    AuthHttpService
  ]
})
export class UsersModule { }
