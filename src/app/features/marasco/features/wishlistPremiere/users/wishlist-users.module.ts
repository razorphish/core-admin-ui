import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {
  WishlistUsersComponent,
  WishlistUsersRoutingModule,
  WishlistUserListComponent,
  WishlistUserComponent,
  WishlistUsersService,
  WishlistUserListResolve,
  WishlistUserResolve,
  WishlistUserGuard,
  WishlistUserFactory
} from '../users';

@NgModule({
  imports: [
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    WishlistUsersRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [],
  declarations: [WishlistUsersComponent, WishlistUserListComponent, WishlistUserComponent],
  providers: [
    WishlistUsersService,
    WishlistUserGuard,
    WishlistUserListResolve,
    WishlistUserResolve,
    WishlistUserFactory,
    UpperCasePipe
  ]
})
export class WishlistUsersModule { }
