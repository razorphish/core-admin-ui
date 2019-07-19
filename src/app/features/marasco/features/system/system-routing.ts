import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full'
  },
  {
    path: 'jobs',
    loadChildren: './jobs/jobs.module#JobsModule',
    data: { pageTitle: 'Jobs' }
  },
  // {
  //   path: 'queues',
  //   loadChildren: './queus/queues.module#QueuesModule',
  //   data: { pageTitle: 'Queues' }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class routing { }
