import { ColDef, ValueGetterParams } from 'ag-grid-community';

import { TemplateComponent } from '../components/template.component';
import { TableFieldAttrs } from '../definitions/internal-definitions';
import { TableButtonInfo, TableField } from '../table-field';

export class AgGridField<T, V> extends TableField<T, V> {
  makeButtons(buttons: (value: V) => TableButtonInfo[]) {
    const { getter, id } = this;
    const attrs = this.attrs as TableFieldAttrs<any, any, any>; // FIXME: Avoid any
    const cellAttrs: TableFieldAttrs<any, any, any> = {
      ...attrs,
      cell: {
        cellClasses: ['cell-no-selection'],
        templateContext: (_, value: V) => buttons(value),
        templateId: 'buttons',
      },
      resizable: false,
    };

    return new AgGridField<T, V>(
      id,
      getter,
      cellAttrs,
    );
  }

  toColDef(): ColDef {
    let colDef: ColDef = {
      cellClass: this.attrs.cell && this.attrs.cell.cellClasses,
      checkboxSelection: this.attrs.checkbox,
      colId: this.id,
      filter: this.attrs.filterable,
      headerCheckboxSelection: this.attrs.headerCheckbox || false,
      headerClass: this.attrs.headerClasses,
      headerName: this.attrs.headerName,
      resizable: this.attrs.resizable,
      sortable: this.attrs.sortable,
      valueGetter: (params: ValueGetterParams) => {
        try {
          return this.getter(params.data);
        } catch (e) {
        }
        return undefined;
      },
      width: this.attrs.width,
    };

    if (this.attrs.cell && this.attrs.cell.templateId) {
      colDef = {
        ...colDef,
        cellRendererFramework: TemplateComponent,
        cellRendererParams: {
          fieldData: this.attrs.cell,
        },
      };
    }

    return colDef;
  }

  fromRow<R>(fn: (row: R) => V) {
    const { getter, id } = this;
    const attrs = this.attrs as TableFieldAttrs<any, any, any>; // FIXME: Avoid any

    return new AgGridField<R, V>(
      id,
      (row2) => getter(fn(row2) as any), // FIXME: Avoid any
      attrs,
    );
  }
}
