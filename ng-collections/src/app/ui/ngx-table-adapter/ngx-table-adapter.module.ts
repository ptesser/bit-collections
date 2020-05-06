import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AgGridModule } from 'ag-grid-angular';

import { TemplateComponent } from './components/template.component';
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
    /**
     * Angular repo for ag-grid: @link https://github.com/ag-grid/ag-grid/tree/master/community-modules/angular/projects/ag-grid-angular
     */
    AgGridModule,
    /**
     * This is done to avoid error: `Function calls are not supported in decorators but 'AgGridModule' was called.`.
     *
     * @link https://github.com/ng-packagr/ng-packagr/issues/727#issuecomment-403383661
     * Docs use `AgGridModule.withComponents([])` function.
     */
    {
      ngModule: AgGridModule,
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [TemplateComponent],
          multi: true,
        }
      ],
    }
  ],
})
export class NgxTableAdapterModule {

  // tslint:disable-next-line:variable-name
  static forRoot(configuration: TableConfigurations): ModuleWithProviders<NgxTableAdapterModule> {
    return {
      ngModule: NgxTableAdapterModule,
      providers: [
        { provide: TABLE_CONFIGURATIONS, useValue: configuration },
      ],
    };
  }
}
