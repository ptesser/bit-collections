import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PagerFn } from './definitions/external-definitions';
import { TablePage } from './definitions/internal-definitions';
import { TableField } from './table-field';

/**
 * `T`: Define the type of the table data.
 * `V`: Define the type of the value for a single field of T
 */
export class Table<T, V> {
  readonly fields: TableField<T, V>[] = [];

  readonly page$ = new BehaviorSubject<TablePage<T>>({
    data: [],
    first: true,
    last: true,
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 1,
  });

  /**
   * Allow to clean a pending observable.
   * This will emit an event on the stream when public `unsubscribe` method is call.
   */
  private readonly onDestroy$ = new Subject();

  constructor(
    // tslint:disable-next-line:variable-name
    pager: PagerFn<T>,
    // tslint:disable-next-line:no-shadowed-variable
    fields: TableField<T, V>[],
  ) {
    // TODO: Add sort, page, filter change
    pager()
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe((page) => {
        this.page$.next({
          data: page.data,
          totalElements: page.count,
          totalPages: 1,
        });
      });

    this.fields = fields;
  }

  /**
   * Unsubscribe from pending Observables.
   */
  unsubscribe() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
