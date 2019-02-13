import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'wishlists',
    pathMatch: 'full'
  },
  {
    path: 'wishlists',
    loadChildren: './wishlists/wishlists.module#WishlistsModule',
    data: { pageTitle: 'Wishlist' }
  },
  {
    path: 'settings',
    loadChildren: './app/wishlist-app.module#WishlistAppModule',
    data: { pageTitle: 'Wishlist App Settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class routing { }
