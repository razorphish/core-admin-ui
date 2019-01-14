import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MarascoRoutingModule } from './marasco-routing.module';
import { MarascoComponent } from './marasco.component';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    MarascoRoutingModule
  ],
  declarations: [
    MarascoComponent
  ]
})
export class MarascoModule { }
