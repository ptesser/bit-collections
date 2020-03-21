import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { NoItemsComponent } from './no-items.component';

@NgModule({
  declarations: [
    NoItemsComponent,
  ],
  exports: [
    NoItemsComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NoItemsModule {}
