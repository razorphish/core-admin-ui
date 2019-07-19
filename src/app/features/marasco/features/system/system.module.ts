import { NgModule } from '@angular/core';

import { routing } from './system-routing';
import { SharedModule } from '@app/features/marasco/shared/shared.module';

import { AuthService } from '../../core/services/auth.service';
import { HttpModule } from '@angular/http';
import { ActivityLogSubjectService } from '../../shared/activitylog.subject-service';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    routing
  ],
  providers: [AuthService, ActivityLogSubjectService],
})
export class SystemModule {}
