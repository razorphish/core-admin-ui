import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component';
import { AuthLayoutComponent } from "./shared/layout/app-layouts/auth-layout.component";
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { pageTitle: 'Home' },
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard/analytics",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        loadChildren: "./features/dashboard/dashboard.module#DashboardModule",
        data: { pageTitle: "Dashboard" }
      },
      {
        path: "account",
        loadChildren: "./features/account/account.module#AccountModule",
        data: { pageTitle: "Account" }
      },
      {
        path: "wishlistPremiere",
        loadChildren: "./features/wishlistPremiere/wishlistPremiere.module#WishlistPremiereModule",
        data: { pageTitle: "Wishlist" }
      },
      {
        path: "system",
        loadChildren: "./features/system/system.module#SystemModule",
        data: { pageTitle: "System" }
      }
    ]
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    loadChildren: "./features/auth/auth.module#AuthModule"
  },
  { path: "**", redirectTo: "miscellaneous/error404" }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class MarascoRoutingModule { }
