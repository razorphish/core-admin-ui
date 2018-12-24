import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LoginComponent
} from '../login';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      pageTitle: 'Login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
