
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationListResolve } from './application-list/application-list.resolve';
import { ApplicationComponent } from './application/application.component';
import { ApplicationResolve } from './application/application.resolve';
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
