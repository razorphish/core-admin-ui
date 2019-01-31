import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistResolve } from './wishlist/wishlist.resolve';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistListResolve } from './wishlist-list/wishlist-list.resolve';
import { WishlistListComponent } from './wishlist-list/wishlist-list.component';
import { WishlistsComponent } from './wishlists.component';

export const routes: Routes = [
  {
    path: '',
    component: WishlistsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: WishlistListComponent,
        data: {
          pageTitle: 'List'
        },
        resolve:
        { wishlists: WishlistListResolve }
      },
      {
        path: 'details/:id',
        component: WishlistComponent,
        data: {
          pageTitle: 'Details'
        },
        resolve: {
          wishlist: WishlistResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistsRoutingModule { }
