import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { AgGridEvent } from 'ag-grid-community';

import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { TableLib, TableOptions, TableSortsDataEvent } from './definitions/external-definitions';
import { TableFilterEvent, TableRowsSelectionEvent, TableSortEvent } from './definitions/internal-definitions';
import { Table } from './table';
import { TemplateCellIdDirective } from './template-cell.directive';
import { TABLE_CONFIGURATIONS, TableConfigurations } from './tokens';
import { projectToMap, transformFilterData, transformSortData } from './utils';

const INIT_TABLE_OPTIONS: TableOptions = {
  colMove: false,
  rowSelection: 'multiple',
};

@Component({
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:component-selector
  selector: 'ui-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
})
export class TableComponent<T> implements AfterViewInit, OnDestroy {

  readonly TableLib = TableLib;

  private readonly table$ = new BehaviorSubject<Table<T, {}> | undefined>(undefined);
  @Input() set table(value: Table<T, {}> | undefined) {
    this.table$.next(value);
  }
  get table() {
    return this.table$.value;
  }

  private readonly options$ = new BehaviorSubject<TableOptions | undefined>(INIT_TABLE_OPTIONS);
  @Input() set options(value: TableOptions | undefined) {
    this.options$.next(value);
  }
  get options() {
    return this.options$.value;
  }

  readonly defaultColDef = {};

  readonly columnDefs$ = this.table$.pipe(
    filter((table): table is Table<T, {}> => !!table),
    map((table) => table.fields.map((col) => col.toColDef())),
  );

  @ViewChildren(TemplateCellIdDirective)
  private readonly cellTemplateRefs?: QueryList<TemplateCellIdDirective>;

  @ContentChildren(TemplateCellIdDirective)
  private readonly cellExternalTemplateRefs?: QueryList<TemplateCellIdDirective>;

  private readonly templates$ = new BehaviorSubject<Record<string, TemplateRef<any>>>({});

  @Output() readonly sort = new EventEmitter<TableSortsDataEvent>();
  @Output() readonly filter = new EventEmitter<any>(); // TODO: Add specific type
  @Output() readonly selectedRows = new EventEmitter<T[]>();

  grid?: AgGridEvent; // TODO: Remove ag-grid references type
  context: { templates: Record<string, TemplateRef<any>> } = { templates: {} };

  constructor(
    @Inject(TABLE_CONFIGURATIONS) readonly configurations: TableConfigurations,
  ) {
  }

  ngAfterViewInit() {
    if (this.cellTemplateRefs && this.cellExternalTemplateRefs) {
      const defaultTemplates = this.cellTemplateRefs.toArray();
      const externalTemplates = this.cellExternalTemplateRefs.toArray();

      const allTemplates = [...defaultTemplates, ...externalTemplates];
      const templates = projectToMap(allTemplates, 'id', (x) => x.templateRef);

      this.templates$.next(templates);
      this.context = { templates };
    }

    // The grid rows must be regenerated whenever the templates change
    setTimeout(() => {
      if (this.grid) {
        this.grid.api.redrawRows();
      }
    });
  }

  onSortChangeHandler(data: TableSortEvent) {
    const transformed = transformSortData(data, this.configurations.lib);

    this.sort.emit(transformed);
  }

  onFilterChangeHandler(data: TableFilterEvent) {
    const transformed = transformFilterData(data, this.configurations.lib);

    this.filter.emit(transformed);
  }

  onRowsSelectionChangeHandler(data: TableRowsSelectionEvent) {
    const selectedRowsValues: T[] = data.api.getSelectedRows();

    this.selectedRows.emit(selectedRowsValues);
  }

  ngOnDestroy() {
    if (this.table) {
      this.table.unsubscribe();
    }
  }
}
