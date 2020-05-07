import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgxFileInputAreaComponent } from './ngx-file-input-area/ngx-file-input-area.component';

const COMPONENTS = [
  NgxFileInputAreaComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
  ]
})
export class NgxFileModule {}
