import { FilterChangedEvent, SelectionChangedEvent, SortChangedEvent } from 'ag-grid-community';

/** General type for sort event emitted by the internal table component. */
export type TableSortEvent = SortChangedEvent;
/** General type for filter change event emitted by the internal table component. */
export type TableFilterEvent = FilterChangedEvent;
/** General type for rows selection change emitted by the internal table component. */
export type TableRowsSelectionEvent = SelectionChangedEvent;

export interface TemplateContext<T> {
  context: {
    templates: any;
    templateId: string;
    value: T;
  };
}

/**
 * TODO: Try to avoid:
 *
 * - templateId as undefinable prop
 * - templateContext as undefinable prop
 */
export interface TableCellAttrs<R, T, V> {
  templateId?: string;
  templateContext?: (row: R, value: V, base: any) => T;
  cellClasses?: string[];
}

export interface TableHeaderAttrs {
  id?: string;
  headerName?: string;
  /**
   * Allow to select/deselect all rows inside the table.
   * This value set a checkbox ui control in the header column.
   */
  headerCheckbox?: boolean;
  headerClasses?: string[];
  /** The width in pixel of a column */
  width?: number;
  /** Field has a checkbox close to the value */
  checkbox?: boolean;
  /** Column related to the field is resizable. */
  resizable?: boolean;
  /** Field is sortable (by header) */
  sortable?: boolean;
  /** Field is filterable (by header) */
  filterable?: boolean;
}

export interface TableFieldAttrs<R, T, V> extends TableHeaderAttrs {
  cell?: TableCellAttrs<R, T, V>;
  row?: T;
}

/**
 * Internal representation of the table data.
 */
export interface TablePage<T> {
  data: T[];
  first?: boolean;
  last?: boolean;
  size?: number;
  totalElements: number;
  totalPages: number;
  number?: number;
}
