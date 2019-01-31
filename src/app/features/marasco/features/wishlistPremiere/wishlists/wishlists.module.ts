import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {
  WishlistsComponent,
  WishlistsRoutingModule,
  WishlistListComponent,
  WishlistComponent,
  WishlistsService,
  WishlistListResolve,
  WishlistResolve,
  WishlistGuard,
  WishlistFactory
} from '../wishlists';

@NgModule({
  imports: [
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    WishlistsRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [],
  declarations: [WishlistsComponent, WishlistListComponent, WishlistComponent],
  providers: [
    WishlistsService,
    WishlistGuard,
    WishlistListResolve,
    WishlistResolve,
    WishlistFactory,
    UpperCasePipe
  ]
})
export class WishlistsModule { }
