import { NgModule } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {
  WishlistAppComponent,
  WishlistAppSettingsComponent,
  WishlistAppSettingsResolve,
  WishlistAppService
} from '../app';

import { WishlistAppRoutingModule } from './wishlists-app-routing.module';

@NgModule({
  imports: [
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    WishlistAppRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [],
  declarations: [WishlistAppComponent, WishlistAppSettingsComponent],
  providers: [
    WishlistAppService,
    WishlistAppSettingsResolve,
    UpperCasePipe
  ]
})
export class WishlistAppModule { }
