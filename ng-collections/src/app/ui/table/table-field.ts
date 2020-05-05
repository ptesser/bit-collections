import { TableFieldAttrs } from './definitions/internal-definitions';

export type TableClickInfo = () => void;

export type TableButtonInfo = {
  classes?: string[];
  click?: TableClickInfo;
  type?: 'warn' | 'primary' | 'secondary',
} & ({ text: string } | { icon: string });

const initTableFieldAttrs: TableFieldAttrs<any, any, any> = {
  checkbox: false,
  filterable: false,
  resizable: true,
  sortable: false,
};

export abstract class TableField<T extends { [key: string]: any }, V = any, R = any> {
  constructor(
    readonly id: string,
    protected readonly getter: (row: T) => V,
    protected attrs: TableFieldAttrs<R, T, V> = initTableFieldAttrs,
  ) {
    this.attrs = {
      ...initTableFieldAttrs,
      ...this.attrs,
    };
  }

  makeAlign(alignment: 'left' | 'center' | 'right') {
    const cssClass = `text-${alignment}`;
    return this.makeHeaderClass(cssClass).makeCellClass(cssClass);
  }

  makeHeaderClass(...headerClasses: string[]) {
    this.attrs.headerClasses = [
      ...(this.attrs.headerClasses || []),
      ...headerClasses,
    ];
    return this;
  }

  makeCellClass(...cellClasses: string[]) {
    if (!this.attrs.cell) {
      throw new Error('Cannot apply cell classes without a valid cell');
    }

    this.attrs.cell.cellClasses = [
      ...(this.attrs.cell.cellClasses || []),
      ...cellClasses,
    ];
    return this;
  }

  makeCheckboxable(allowSelectAll = false) {
    this.attrs.checkbox = true;
    this.attrs.headerCheckbox = allowSelectAll;
    this.attrs.filterable = false;
    this.attrs.resizable = false;

    this.attrs.cell = {
      ...this.attrs.cell,
      cellClasses: ['cell-no-selection'],
    };
    return this;
  }

  makeSortable() {
    this.attrs.sortable = true;
    return this;
  }

  makeFilterable() {
    this.attrs.filterable = true;
    return this;
  }

  makeHeader(headerName: string) {
    this.attrs.headerName = headerName;
    return this;
  }

  setResizable(value: boolean) {
    this.attrs.resizable = value;
    return this;
  }

  setWith(width: number) {
    this.attrs.width = width;
    return this;
  }

  abstract makeButtons(buttons: (value: V) => TableButtonInfo[]): TableField<R>;
  /**
   * Transform field to a column definition for the table component used.
   */
  abstract toColDef(): any;
  abstract fromRow<Z>(f: (row: Z) => V): TableField<R>;
}
