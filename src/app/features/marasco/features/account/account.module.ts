import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing';

import { AuthService } from '../../core/services/auth.service';

@NgModule({
  imports: [CommonModule, AccountRoutingModule],
  declarations: [AccountComponent],
  providers: [AuthService]
})
export class AccountModule { }
