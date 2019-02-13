import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistAppSettingsResolve } from './settings/wishlist-app-settings.resolve';
import { WishlistAppSettingsComponent } from './settings/wishlist-app-settings.component';

import { WishlistAppComponent } from './wishlist-app.component';

export const routes: Routes = [
  {
    path: '',
    component: WishlistAppComponent,
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        component: WishlistAppSettingsComponent,
        data: {
          pageTitle: 'List'
        },
        resolve:
        { wishlistAppSettings: WishlistAppSettingsResolve }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistAppRoutingModule { }
