import { Observable } from 'rxjs';

/** General type for sort event emitted by the table exposed component. */
export interface TableSortDataEvent {
  field: string;
  type: 'ASC' | 'DESC';
}
export type TableSortsDataEvent = TableSortDataEvent[];

/** General table configurations. */
export interface TableOptions {
  colMove: boolean;
  rowSelection: 'single' | 'multiple';
}

export enum TableLib {
  'aggrid' = 'ag-grid',
}

export interface Page<T> {
  data: T[] | [];
  count: number;
}

// TODO: Add param `filter?: TableFilterType`
export type PagerFn<T> = (page?: number, limit?: number, sorts?: TableSortDataEvent) => Observable<Page<T>>;
