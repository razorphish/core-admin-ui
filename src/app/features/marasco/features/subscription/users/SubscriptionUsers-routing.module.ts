import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionUserResolve } from './user/subscriptionUser.resolve';
import { SubcriptionUserComponent } from './user/subscriptionUser.component';
import { SubscriptionUserListResolve } from './user-list/subscriptionUser-list.resolve';
import { SubscriptionUserListComponent } from './user-list/subscriptionUser-list.component';
import { SubscriptionUsersComponent } from './SubscriptionUsers.component';

export const routes: Routes = [
  {
    path: '',
    component: SubscriptionUsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: SubscriptionUserListComponent,
        data: {
          pageTitle: 'List',
        },
        resolve: {
          subscriptionUsers: SubscriptionUserListResolve,
        },
      },
      {
        path: 'details/:id',
        component: SubcriptionUserComponent,
        data: {
          pageTitle: 'Details',
        },
        resolve: {
          subscriptionUser: SubscriptionUserResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionUsersRoutingModule {}
