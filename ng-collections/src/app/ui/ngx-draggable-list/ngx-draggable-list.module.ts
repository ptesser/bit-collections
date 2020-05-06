import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DraggableListComponent } from './draggable-list.component';
import { ListDirective } from './list.directive';
import { ListItemDirective } from './list-item.directive';

const COMPONENTS = [
  DraggableListComponent,
];

const DIRECTIVES = [
  ListDirective,
  ListItemDirective,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatListModule,
  ],
})
export class NgxDraggableListModule {}
