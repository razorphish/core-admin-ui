import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from "./auth.routing";
import { AuthComponent } from './auth.component';
import { ResetGuard } from './reset/reset.guard';

@NgModule({
  imports: [
    CommonModule,

    routing,
  ],
  declarations: [AuthComponent],
  providers: [
    ResetGuard
  ]
})
export class AuthModule { }
