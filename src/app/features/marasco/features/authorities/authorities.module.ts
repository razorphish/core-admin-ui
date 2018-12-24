import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthoritiesComponent } from './authorities.component';
import { AuthoritiesService } from './shared/authorities.service';
import { AlertService } from './shared/alert.service';
import { routing } from './authorities-routing';

// used to create fake backend
// import { fakeBackendProvider } from  './shared/fake-backend';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';

@NgModule({
  imports: [CommonModule, routing, FormsModule],
  declarations: [AuthoritiesComponent],
  providers: [
    AuthoritiesService,
    AlertService
    // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ]
})
export class AuthoritiesModule {}
