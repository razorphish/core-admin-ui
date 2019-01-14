import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { SmartadminValidationModule } from '@app/features/marasco/shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '@app/features/marasco/shared/forms/input/smartadmin-input.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,

    FormsModule,
    SmartadminValidationModule,
    SmartadminInputModule
  ],
  exports: [],
  declarations: [RegisterComponent, TermsModalComponent]
})
export class RegisterModule { }
