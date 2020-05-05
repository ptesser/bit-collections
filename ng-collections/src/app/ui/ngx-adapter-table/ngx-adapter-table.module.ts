import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AgGridModule } from 'ag-grid-angular';

import { TemplateComponent } from './components/template.component';
import { TableService } from './services/table.service';
import { TableComponent } from './table.component';
import { TemplateCellIdDirective } from './template-cell.directive';
import { TABLE_CONFIGURATIONS, TableConfigurations } from './tokens';

export * from './adapter/ag-grid-table';
export * from './definitions/external-definitions';
export * from './services/table.service';
export * from './table-field';
export * from './table';
export * from './tokens';
export * from './utils';

const COMPONENTS = [
  TableComponent,
  TemplateComponent,
];

const DIRECTIVES = [
  TemplateCellIdDirective,
];

const SERVICES = [
  TableService,
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
    // External dependecies
    MatButtonModule,
    MatIconModule,
    // External Grid Libs
    AgGridModule.withComponents([TemplateComponent]),
  ],
})
export class NgxAdapterTableModule {

  // tslint:disable-next-line:variable-name
  static forRoot(configuration: TableConfigurations): ModuleWithProviders<NgxAdapterTableModule> {
    return {
      ngModule: NgxAdapterTableModule,
      providers: [
        ...SERVICES,
        { provide: TABLE_CONFIGURATIONS, useValue: configuration },
      ],
    };
  }
}
