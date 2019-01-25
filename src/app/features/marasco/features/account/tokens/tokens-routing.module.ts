import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenResolve } from './token/token.resolve';
import { TokenComponent } from './token/token.component';
import { TokenListResolve } from './token-list/token-list.resolve';
import { TokenListComponent } from './token-list/token-list.component';
import { TokensComponent } from './tokens.component';

export const routes: Routes = [
  {
    path: '',
    component: TokensComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TokenListComponent,
        data: {
          pageTitle: 'List'
        },
        resolve:
          { tokens: TokenListResolve }
      },
      {
        path: 'details/:id',
        component: TokenComponent,
        data: {
          pageTitle: 'Details'
        },
        resolve: {
          token: TokenResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokensRoutingModule { }
