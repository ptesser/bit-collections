import { PagerFn, TableLib, TableSortsDataEvent } from './definitions/external-definitions';
import { TableCellAttrs, TableFilterEvent, TableSortEvent, TemplateContext } from './definitions/internal-definitions';
import { Table } from './table';
import { TableField } from './table-field';

/**
 * Convert an array into a map, mapping each element with a projection function
 *
 * @param array the array
 * @param key the name of the field that will be used as key
 * @param proj the function used to transform the elements
 */
export function projectToMap<T extends Record<K, string>, K extends keyof T, U>(array: T[], key: K, proj: (x: T) => U) {
  return array.reduce((base, v) => {
    const id = v[key];
    base[id] = proj(v);
    return base;
  }, {} as Record<T[K], U>);
}

/**
 *
 * @param data Data to transform from internal component representation to the external ones.
 * @param lib Libray used for display data.
 */
export function transformSortData(data: TableSortEvent, lib = TableLib.aggrid) {
  switch (lib) {
    case TableLib.aggrid:
    default:
      const transformed: TableSortsDataEvent = data.api.getSortModel().map((s) =>
        ({ field: s.colId, type: s.sort.toUpperCase() as 'ASC' | 'DESC' }));

      return transformed;
  }
}

/**
 *
 * @param data Data to transform from internal component representation to the external ones.
 * @param lib Libray used for display data.
 */
export function transformFilterData(data: TableFilterEvent, lib = TableLib.aggrid) {
  switch (lib) {
    case TableLib.aggrid:
    default:
      const transformed = data.api.getFilterModel() as TableSortsDataEvent;

      return transformed;
  }
}

// tslint:disable-next-line:no-shadowed-variable
export function makeTable<T, V>(pager: PagerFn<T>, fields: TableField<T, V>[]) {
  return new Table<T, V>(pager, fields);
}

/**
 * Construct a new TableField for a specific class.
 * This field is use to show a value from the data model of the table.
 */
export function makeTableField<R, T extends TableField<R, F>, F = any>(
  classColumn: new (...args: any[]) => T,
  field?: keyof R,
) {
  const id = field;
  const getter = field && ((row: R) => row[field]);

  return new classColumn(id, getter);
}

/**
 * Construct a new TableField for a specific class.
 * This field is use to show a generic element inside the cell.
 */
export function makeGenericField<R, T extends TableField<R, F>, F = any>(
  classColumn: new (...args: any[]) => T,
  id?: string,
) {
  return new classColumn(id, (row: R) => row);
}

// Allow nestable TableColumn<R, {}, {}>
export function fields<R>(...items: Array<TableField<R, {}>>) {
  return items;
}

export function resolveCell<R, T, V>(cell: TableCellAttrs<R, T, V>, row: R, value: V, base: any): TemplateContext<T> {
  return {
    context: {
      ...base,
      templateId: cell.templateId,
      value: cell && cell.templateContext && cell.templateContext(row, value, base),
    },
  };
}
