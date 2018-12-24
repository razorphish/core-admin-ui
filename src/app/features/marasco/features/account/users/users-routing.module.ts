import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserResolve } from './user/user.resolve';
import { UserComponent } from './user/user.component';
import { UserListResolve } from './user-list/user-list.resolve';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: UserListComponent,
        data: {
          pageTitle: 'List'
        },
        resolve:
        { users: UserListResolve }
      },
      {
        path: 'details/:id',
        component: UserComponent,
        data: {
          pageTitle: 'Details'
        },
        resolve: {
          user: UserResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
// export const UserRoutingModule = RouterModule.forChild(routes);

// export const routedComponents = [UserListComponent, UserDetailsComponent];
