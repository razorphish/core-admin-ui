import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing';

import { AuthoritiesService } from '../authorities';

@NgModule({
  imports: [CommonModule, AccountRoutingModule],
  declarations: [AccountComponent],
  providers: [AuthoritiesService]
})
export class AccountModule {}
