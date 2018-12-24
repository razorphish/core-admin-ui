import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: 'app/features/marasco/features/account/users/users.module#UsersModule',
    data: { pageTitle: 'Users' }
  },
  {
    path: 'roles',
    loadChildren: 'app/features/marasco/features/account/roles/roles.module#RolesModule',
    data: { pageTitle: 'Roles' }
  },
  {
    path: 'api-clients',
    loadChildren: 'app/features/marasco/features/account/api-clients/api-clients.module#ApiClientsModule',
    data: { pageTitle: 'Api Clients' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}

// export const routedComponents = [AccountComponent];
