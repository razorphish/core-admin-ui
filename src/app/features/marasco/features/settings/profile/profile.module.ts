import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarascoAdminLayoutModule } from '../../../shared/layout/layout.module';

import { SharedModule } from '../../../shared/shared.module';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { AuthHttpService } from '../../../core/services/auth-http.service';

import {
  ProfileComponent,
  ProfileService,
  ProfileRoutingModule
} from '../profile';

@NgModule({
  imports: [
    CommonModule,
    MarascoAdminLayoutModule,
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService, AuthHttpService]
})
export class ProfileModule {}
