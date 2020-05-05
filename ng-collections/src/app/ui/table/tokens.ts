import { InjectionToken } from '@angular/core';

import { TableLib } from './definitions/external-definitions';

export const TABLE_CONFIGURATIONS = new InjectionToken('TABLE_CONFIGURATIONS');

export interface TableConfigurations {
  lib: TableLib;
}
