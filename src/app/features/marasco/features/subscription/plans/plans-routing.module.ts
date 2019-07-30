import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPlanResolve } from './plan/subscriptionPlan.resolve';
import { SubcriptionPlanComponent } from './plan/subscriptionPlan.component';
import { SubscriptionPlanListResolve } from './plan-list/subscriptionPlan-list.resolve';
import { SubscriptionPlanListComponent } from './plan-list/subscriptionPlan-list.component';
import { SubscriptionPlansComponent } from './plans.component';

export const routes: Routes = [
  {
    path: '',
    component: SubscriptionPlansComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: SubscriptionPlanListComponent,
        data: {
          pageTitle: 'List',
        },
        resolve: {
          subscriptionPlans: SubscriptionPlanListResolve,
        },
      },
      {
        path: 'details/:id',
        component: SubcriptionPlanComponent,
        data: {
          pageTitle: 'Details',
        },
        resolve: {
          subscriptionPlan: SubscriptionPlanResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPlansRoutingModule {}
