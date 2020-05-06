import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { resolveCell } from '../utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-template',
  styleUrls: [],
  template: `
  <ng-template
    [ngTemplateOutlet]="templates[templateId]"
    [ngTemplateOutletContext]="context">
  </ng-template>
  `,
})
export class TemplateComponent implements AgRendererComponent {
  /** The template identifier to use as render cell component. */
  @Input() templateId?: string;
  /** List of all availables templates to render in a cell component. */
  @Input() templates?: Record<string, TemplateRef<any>>;
  /** Context of the cell */
  @Input() context: any = {
    templates: {},
  };

  agInit(params: ICellRendererParams & { fieldData: any }) {
    this.refresh(params);
  }

  refresh(params: ICellRendererParams & { fieldData: any }) {
    if (params.fieldData) {
      this.context = resolveCell(params.fieldData, params.data, params.value, { templates: params.context.templates });
      this.templateId = this.context.context.templateId;
      this.templates = this.context.context.templates;
    } else {
      this.context = {
        templateId: params.value.templateId,
        templates: params.value.templates,
        value: params.value.value,
      };
      this.templateId = params.value.templateId;
      this.templates = params.value.templates;
    }
    return true;
  }
}
