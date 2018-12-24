import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiClientListResolve } from './api-client-list/api-client-list.resolve';
import { ApiClientResolve } from './api-client/api-client.resolve';
import { ApiClientComponent } from './api-client/api-client.component';
import { ApiClientsComponent } from './api-clients.component';
import { ApiClientListComponent } from './api-client-list/api-client-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ApiClientsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ApiClientListComponent,
        data: {
          pageTitle: 'List'
        },
        resolve:
        { apiClients: ApiClientListResolve }
      },
      {
        path: 'details/:id',
        component: ApiClientComponent,
        data: {
          pageTitle: 'Details'
        },
        resolve: {
          apiClient: ApiClientResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiClientsRoutingModule { }

