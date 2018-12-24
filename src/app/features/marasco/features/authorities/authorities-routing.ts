import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: 'app/features/marasco/authorities/login/login.module#LoginModule',
    data: { pageTitle: 'Login' }
  },
  {
    path: 'register',
    loadChildren:
      'app/features/marasco/authorities/register/register.module#RegisterModule',
    data: { pageTitle: 'Register' }
  }
  // { path: 'services', loadChildren: 'app/features/marasco/account/services/services.module#ServicesModule', data: { pageTitle: 'Default Services' } }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class AuthoritiesRoutingModule {}
export const routing = RouterModule.forChild(routes);
