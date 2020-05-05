import { Injectable } from '@angular/core';

import { PagerFn } from '../definitions/external-definitions';
import { TableField } from '../table-field';
import { makeGenericField, makeTable, makeTableField } from '../utils';

@Injectable()
export class TableService<T, V = any> {

  makeTable(pager: PagerFn<T>, fields: TableField<T, V>[]) {
    return makeTable(pager, fields);
  }

  makeModelField(
    classColumn: new (...args: any[]) => TableField<T, V>,
    field: keyof T,
  ) {
    return makeTableField<T, TableField<T, V>>(classColumn, field);
  }

  makeGenericField(
    classColumn: new (...args: any[]) => TableField<T, V>,
    id: string,
  ) {
    return makeGenericField<T, TableField<T, V>>(classColumn, id);
  }
}
