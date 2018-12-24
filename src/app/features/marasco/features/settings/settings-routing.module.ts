import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-profile',
    pathMatch: 'full'
  },
  {
    path: 'my-profile',
    loadChildren:
      'app/features/marasco/settings/profile/profile.module#ProfileModule',
    data: { pageTitle: 'My Profile' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
