import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Application } from '../shared/application.interface';

import * as moment from 'moment';

@Component({
  selector: 'marasco-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  errorMessage: string;
  applications: Application[] = [];
  options: {};
  message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.applications = this._route.snapshot.data['applications'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/account/applications/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.applications,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name' },
        { data: 'statusId' },
        { data: 'url' },
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
            that._router.navigate(['/account/applications/details/', 0]);
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
