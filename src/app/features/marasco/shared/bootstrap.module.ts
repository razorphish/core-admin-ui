import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ModalModule,
  ButtonsModule,
  TooltipModule,
  BsDropdownModule,
  ProgressbarModule,
  AlertModule,
  TabsModule,
  AccordionModule,
  CarouselModule,
  PopoverModule,
  TimepickerModule,
  BsDatepickerModule,
} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,

    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),

    PopoverModule.forRoot(),
  ],
  exports: [
    ModalModule,
    ButtonsModule,
    TooltipModule,
    BsDropdownModule,
    ProgressbarModule,
    AlertModule,
    TabsModule,
    AccordionModule,
    CarouselModule,
    TimepickerModule,
    BsDatepickerModule,
  ],
  declarations: [],
})
export class BootstrapModule {}
