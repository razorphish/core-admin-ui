import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobResolve } from './job/job.resolve';
import { JobComponent } from './job/job.component';
import { JobListResolve } from './job-list/job-list.resolve';
import { JobListComponent } from './job-list/job-list.component';
import { JobsComponent } from './jobs.component';

export const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: JobListComponent,
        data: {
          pageTitle: 'List',
        },
        resolve: { jobs: JobListResolve },
      },
      {
        path: 'details/:id',
        component: JobComponent,
        data: {
          pageTitle: 'Details',
        },
        resolve: {
          job: JobResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
