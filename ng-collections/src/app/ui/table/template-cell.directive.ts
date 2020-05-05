import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTemplateCellId]',
})
export class TemplateCellIdDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('appTemplateCellId') id!: string;

  constructor(
    public readonly templateRef: TemplateRef<any>,
  ) {
  }
}
