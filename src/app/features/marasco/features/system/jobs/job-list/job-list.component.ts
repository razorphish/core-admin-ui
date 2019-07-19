import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { Job } from '../shared/Job.interface';

@Component({
  selector: 'marasco-system-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  errorMessage: string;
  jobs: Job[] = [];
  options: {};
  message: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this.jobs = this._route.snapshot.data['jobs'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/system/jobs/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.jobs,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name', defaultContent: '<i>Not Set</i>' },
        // { data: 'userId', title: 'User',
        //   render: (data, type,row, meta) => {
        //     return `${data.firstName} ${data.lastName}`
        //   }
        // },
        // { data: 'userId.username' },
        // { data: 'userId.email' },
        { data: 'activityStatusId', title: 'Activity' },
        { data: 'statusId', title: 'Status' },
        {
          data: 'execution.started',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          }
        },
        {
          data: 'execution.completed',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          },
        },
        {
          data: 'execution.kickoff',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          },
        },
        {
          data: 'dateCreated',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          },
        },
      ],
      buttons: [
        'copy',
        'excel',
        'pdf',
        'print',
        {
          text: 'Create',
          action: function(e, dt, node, config) {
            that._router.navigate(['/system/jobs/details/', 0]);
          },
          className: 'btn btn-primary',
        },
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        jQuery('td', row).unbind('click');
        jQuery('td', row).bind('click', () => {
          self.toDetails(data);
        });
        return row;
      },
    };
  }
}
