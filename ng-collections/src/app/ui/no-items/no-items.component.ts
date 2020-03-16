import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'ui-no-items',
  styleUrls: ['./no-items.component.scss'],
  templateUrl: './no-items.component.html',
})
export class NoItemsComponent {
}
