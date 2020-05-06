import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uiListItem]',
})
export class ListItemDirective {
  constructor(public readonly templateRef: TemplateRef<any>) {
  }
}
