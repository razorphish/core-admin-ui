import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { IApiClient } from '../shared/IApiClient';
import { ApiClientService } from '../shared/api-client.service';

@Component({
  selector: 'marasco-api-client-list',
  templateUrl: './api-client-list.component.html',
  styleUrls: ['./api-client-list.component.css']
})
export class ApiClientListComponent implements OnInit {
  errorMessage: string;
  apiClients: IApiClient[] = [];
  options: {};
  message: string;

  constructor(
    private _apiClientService: ApiClientService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.apiClients = this._route.snapshot.data['apiClients'];
    this.activate();
  }

  toDetails(info: any): void {
    this._router.navigate(['/account/api-clients/details/' + info._id]);
  }

  private activate() {
    const that = this;
    this.options = {
      dom: 'Bfrtip',
      data: this.apiClients,
      columns: [
        { data: '_id', title: 'Id' },
        { data: 'name'},
        { data: 'clientId'},
        { data: 'isTrusted' },
        { data: 'applicationType' },
        { data: 'redirectUrl' },
        { data: 'tokenProtocol' },
        { data: 'tokenLifeTime'},
        { data: 'refreshTokenLifeTime' },
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
            that._router.navigate(['/account/api-clients/details/', 0]);
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
