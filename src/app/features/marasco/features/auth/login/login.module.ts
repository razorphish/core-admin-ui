import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { SmartadminValidationModule } from '@app/features/marasco/shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '@app/features/marasco/shared/forms/input/smartadmin-input.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,

    FormsModule,
    SmartadminValidationModule,
    SmartadminInputModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
