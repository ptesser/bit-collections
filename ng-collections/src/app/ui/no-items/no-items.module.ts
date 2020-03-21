import { NgModule } from '@angular/core';
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
})
export class NoItemsModule {}
