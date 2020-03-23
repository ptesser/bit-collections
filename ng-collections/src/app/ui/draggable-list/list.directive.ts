import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uiList]',
})
export class ListDirective {
  constructor(public readonly templateRef: TemplateRef<any>) {
  }
}
