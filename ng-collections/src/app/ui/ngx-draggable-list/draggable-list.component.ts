import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';

import { ListItemDirective } from './list-item.directive';
import { ListDirective } from './list.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'ui-draggable-list',
  styleUrls: ['./draggable-list.component.scss'],
  templateUrl: './draggable-list.component.html',
})
export class DraggableListComponent<T> {

  @Input() items: T[] = [];
  @Input() sortingDisabled = false;

  @ContentChild(ListItemDirective, { static: false }) itemTemplate?: ListItemDirective;
  @ContentChild(ListDirective, { static: false }) listTemplate?: ListDirective;

  @Output() readonly dropComplete = new EventEmitter();

  // tslint:disable-next-line:variable-name
  trackByIndex(index: number, _item: T) {
    return index;
  }

  dropHandler(event: CdkDragDrop<T[]>) {
    const orderedItems = [ ...this.items ];
    moveItemInArray(orderedItems, event.previousIndex, event.currentIndex);

    this.dropComplete.emit(orderedItems);
  }
}
