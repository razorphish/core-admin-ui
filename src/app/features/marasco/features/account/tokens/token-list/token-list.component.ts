import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { IToken } from './../shared/IToken';

@Component({
  selector: 'marasco-account-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {
  errorMessage: string;
  tokens: IToken[] = [];
  options: {};
  message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.tokens = this._route.snapshot.data['tokens'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/account/tokens/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.tokens,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'userId.firstName', defaultContent: '<i>Not Set</i>' },
        { data: 'userId.lastName', defaultContent: '<i>Not Set</i>' },
        { data: 'userId.username' },
        { data: 'userId.email' },
        { data: 'name' },
        { data: 'origin' },
        { data: 'expiresIn', title: 'Expires In' },
        {
          data: 'dateExpire', title: 'Expires',
          render: (data, type, row, meta) => {
            return moment(data).format('LLL');
          }
        },
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
          action: function (e, dt, node, config) {
            that._router.navigate(['/account/tokens/details/', 0]);
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
