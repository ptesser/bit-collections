import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NoItemsComponent } from './no-items.component';
import { CommonModule } from '@angular/common';

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
