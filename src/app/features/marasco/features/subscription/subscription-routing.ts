import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'plans',
    pathMatch: 'full',
  },
  {
    path: 'plans',
    loadChildren: './plans/plans.module#SubscriptionPlansModule',
    data: { pageTitle: 'Subscription Plans' },
  },
  {
    path: 'users',
    loadChildren: './users/users.module#SubscriptionUsersModule',
    data: { pageTitle: 'Subscription Users' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class routing {}
