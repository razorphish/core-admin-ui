import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetRoutingModule } from './reset-routing.module';
import { ResetComponent } from './reset.component';

import { SmartadminValidationModule } from '@app/features/marasco/shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '@app/features/marasco/shared/forms/input/smartadmin-input.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ResetRoutingModule,

    FormsModule,
    SmartadminValidationModule,
    SmartadminInputModule
  ],
  declarations: [ResetComponent]
})
export class ResetModule { }
