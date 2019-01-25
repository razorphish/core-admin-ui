import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    data: { pageTitle: 'Users' }
  },
  {
    path: 'roles',
    loadChildren: './roles/roles.module#RolesModule',
    data: { pageTitle: 'Roles' }
  },
  {
    path: 'api-clients',
    loadChildren: './api-clients/api-clients.module#ApiClientsModule',
    data: { pageTitle: 'Api Clients' }
  },
  {
    path: 'tokens',
    loadChildren: './tokens/tokens.module#TokensModule',
    data: { pageTitle: 'Tokens' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class routing { }
