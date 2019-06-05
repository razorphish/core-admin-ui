import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistUserResolve } from './user/wishlist-user.resolve';
import { WishlistUserComponent } from './user/wishlist-user.component';
import { WishlistUserListResolve } from './user-list/wishlist-user-list.resolve';
import { WishlistUserListComponent } from './user-list/wishlist-user-list.component';
import { WishlistUsersComponent } from './wishlist-users.component';

export const routes: Routes = [
  {
    path: '',
    component: WishlistUsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: WishlistUserListComponent,
        data: {
          pageTitle: 'List'
        },
        resolve:
        { wishlistUsers: WishlistUserListResolve }
      },
      {
        path: 'details/:id',
        component: WishlistUserComponent,
        data: {
          pageTitle: 'Details'
        },
        resolve: {
          wishlistUser: WishlistUserResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistUsersRoutingModule { }
