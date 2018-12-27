import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component';
import { AuthLayoutComponent } from "./shared/layout/app-layouts/auth-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { pageTitle: 'Home' },
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
    ]
  },
  //,
  // {
  //   path: 'my-services',
  //   loadChildren: 'app/features/features/marasco/my-services/my-services.module#MyServicesModule',
  //   data: { pageTitle: 'My Services' }
  // },
  // {
  //   path: 'calendar',
  //   loadChildren: 'app/features/features/marasco/calendar/calendar.module#CalendarModule',
  //   data: { pageTitle: 'Calendar' }
  // },
  // {
  //   path: 'notifications',
  //   loadChildren:
  //     'app/features/marasco/features/notifications/notifications.module#NotificationsModule',
  //   data: { pageTitle: 'Notifications' }
  // },
  // {
  //   path: 'settings',
  //   loadChildren:
  //     'app/features/marasco/features/settings/settings.module#SettingsModule',
  //   data: { pageTitle: 'Settings' }
  // }
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
