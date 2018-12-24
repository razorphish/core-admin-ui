import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  RegisterComponent
} from '../register';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    data: {
      pageTitle: 'Register'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule { }