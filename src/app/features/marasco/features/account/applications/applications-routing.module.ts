
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationResolve } from './application/application.resolve';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListResolve } from './application-list/application-list.resolve';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationsComponent } from './applications.component';

export const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ApplicationListComponent,
        data: {
          pageTitle: 'List'
        },
        resolve: { applications: ApplicationListResolve }
      },
      {
        path: 'details/:id',
        component: ApplicationComponent,
        data: {
          pageTitle: 'Details'
        },
        resolve: {
          application: ApplicationResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
//export const ApplicationRoutingModule = RouterModule.forChild(routes);

//export const routedComponents = [ApplicationListComponent, ApplicationDetailsComponent];
