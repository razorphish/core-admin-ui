
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from '../../../shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';

import { ApiClientsRoutingModule } from './api-clients-routing.module';
import { ApiClientFactory } from './shared/api-client.factory';
import { ApiClientResolve } from './api-client/api-client.resolve';
import { ApiClientListResolve } from './api-client-list/api-client-list.resolve';
import { ApiClientService } from './shared/api-client.service';
import { ApiClientListComponent } from './api-client-list/api-client-list.component';
import { ApiClientComponent } from './api-client/api-client.component';
import { ApiClientsComponent } from './api-clients.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    ApiClientsRoutingModule
  ],
  declarations: [
    ApiClientsComponent,
    ApiClientComponent,
    ApiClientListComponent
  ],
  providers: [
    ApiClientService,
    ApiClientFactory,
    ApiClientListResolve,
    ApiClientResolve
  ]
})
export class ApiClientsModule {}
