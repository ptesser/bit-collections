import { NgModule } from '@angular/core';
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
    MatIconModule,
  ],
})
export class NoItemsModule {}
