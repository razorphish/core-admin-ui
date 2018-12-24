
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleResolve } from './role/role.resolve';
import { RoleComponent } from './role/role.component';
import { RoleListResolve } from './role-list/role-list.resolve';
import { RoleListComponent } from './role-list/role-list.component';
import { RolesComponent } from './roles.component';

export const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: RoleListComponent,
        data: {
          pageTitle: 'List'
        },
        resolve: { roles: RoleListResolve }
      },
      {
        path: 'details/:id',
        component: RoleComponent,
        data: {
          pageTitle: 'Details'
        },
        resolve: {
          role: RoleResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}
//export const RoleRoutingModule = RouterModule.forChild(routes);

//export const routedComponents = [RoleListComponent, RoleDetailsComponent];
