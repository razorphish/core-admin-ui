import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IRole } from './../shared/IRole';

@Component({
  selector: 'marasco-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  errorMessage: string;
  roles: IRole[] = [];
  options: {};
  message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.roles = this._route.snapshot.data['roles'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/account/roles/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.roles,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name' },
        { data: 'normalizedName' }
      ],
      buttons: [
        'copy',
        'excel',
        'pdf',
        'print',
        {
          text: 'Create',
          action: function(e, dt, node, config) {
            that._router.navigate(['/account/roles/details/', 0]);
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
