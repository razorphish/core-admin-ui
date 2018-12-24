import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/features/marasco/features/account/account.module#AccountModule',
    data: { pageTitle: 'Account' }
  }
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarascoRoutingModule {}
