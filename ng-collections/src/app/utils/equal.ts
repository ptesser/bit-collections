/**
 * This file is copy from fast-deep-equal implementation.
 * This is done in order to allow to use in Bit with Angular compiler.
 *
 * Version: 3.1.1
 */

'use strict';

// do not edit .js files directly - edit src/index.jst

// FIXME: Enable after resolve: Cannot find name 'BigInt64Array'
// const envHasBigInt64Array = typeof BigInt64Array !== 'undefined';

export function equal(a: any, b: any) {
  if (a === b) { return true; }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) { return false; }

    let length;
    let i;
    let keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) { return false; }
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) { return false; }
      }
      return true;
    }

    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) { return false; }
      for (i of a.entries()) {
        if (!b.has(i[0])) { return false; }
      }
      for (i of a.entries()) {
        if (!equal(i[1], b.get(i[0]))) { return false; }
      }
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) { return false; }
      for (i of a.entries()) {
        if (!b.has(i[0])) { return false; }
      }
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = (a as any).length; // FIXME: Property 'length' does not exist on type 'ArrayBufferView'
      if (length !== (b as any).length) { return false; }

      for (i = length; i-- !== 0;) {
        if (a[i] !== b[i]) { return false; }
      }
      return true;
    }

    if (a.constructor === RegExp) { return a.source === b.source && a.flags === b.flags; }
    if (a.valueOf !== Object.prototype.valueOf) { return a.valueOf() === b.valueOf(); }
    if (a.toString !== Object.prototype.toString) { return a.toString() === b.toString(); }

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) { return false; }

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) { return false; }
    }

    for (i = length; i-- !== 0;) {
      const key = keys[i];

      if (!equal(a[key], b[key])) { return false; }
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
}

