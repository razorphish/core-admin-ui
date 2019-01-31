import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { Wishlist } from '../shared/Wishlist.interface';

@Component({
  selector: 'marasco-wishlistPremiere-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent implements OnInit {
  errorMessage: string;
  wishlists: Wishlist[] = [];
  options: {};
  message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.wishlists = this._route.snapshot.data['wishlists'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/wishlistPremiere/wishlists/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.wishlists,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name', title: 'Name', defaultContent: '<i>Not Set</i>' },
        { data: 'userId', title: 'User',
          render: (data, type,row, meta) => {
            return `${data.firstName} ${data.lastName}`
          }
        },
        { data: 'userId.username' },
        { data: 'userId.email' },
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
            that._router.navigate(['/wishlistPremiere/wishlists/details/', 0]);
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
