import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { SubscriptionUser } from '../shared/SubscriptionUser.interface';

@Component({
  selector: 'marasco-subscriptions-user-list',
  templateUrl: './subscriptionUser-list.component.html',
  styleUrls: ['./subscriptionUser-list.component.css'],
})
export class SubscriptionUserListComponent implements OnInit {
  errorMessage: string;
  jobs: SubscriptionUser[] = [];
  options: {};
  message: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this.jobs = this._route.snapshot.data['subscriptionUsers'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/subscription/users/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.jobs,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name', defaultContent: '<i>Not Set</i>' },
        { data: 'description', title: 'Description' },
        { data: 'statusId', title: 'Status' },
        {
          data: 'applicationId',
          title: 'Application',
          render: (data, type, row, meta) => {
            return data.name;
          },
        },
        {
          data: 'dateExpire',
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
            that._router.navigate(['/subscription/plans/details/', 0]);
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
