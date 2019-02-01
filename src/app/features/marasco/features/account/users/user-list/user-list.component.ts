import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { User } from '../../../../core/interfaces/UserInfo.interface';

@Component({
  selector: 'marasco-account-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  errorMessage: string;
  users: User[] = [];
  options: {};
  message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.users = this._route.snapshot.data['users'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/account/users/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.users,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'firstName', defaultContent: '<i>Not Set</i>' },
        { data: 'lastName', defaultContent: '<i>Not Set</i>' },
        { data: 'applicationId.name', defaultContent: '<i>Not Set</i>' },
        { data: 'username' },
        { data: 'email' },
        {
          data: 'dateCreated',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          }
        }
      ],
      buttons: [
        'copy',
        'excel',
        'pdf',
        'print',
        {
          text: 'Create',
          action: function(e, dt, node, config) {
            that._router.navigate(['/account/users/details/', 0]);
          },
          className: 'btn btn-primary'
        }
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
      }
    };
  }
}
