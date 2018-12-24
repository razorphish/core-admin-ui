import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ProfileComponent
} from './profile.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'details',
    //     pathMatch: 'full'
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
