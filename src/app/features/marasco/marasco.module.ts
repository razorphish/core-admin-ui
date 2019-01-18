import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MarascoRoutingModule } from './marasco-routing.module';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    MarascoRoutingModule
  ],
})
export class MarascoModule { }
