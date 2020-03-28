/**
 * General encapsultated utils.
 * This allow to improve typing.
 *
 */
export function parse<T>(value: string): T {
  return JSON.parse(value);
}

export function stringify<T>(value: T) {
  return JSON.stringify(value);
}

export function clone<T>(o: T): T {
  return parse(stringify(o));
}

export function keys<T extends { [key: string]: any }>(x: T): Array<keyof T> {
  return Object.keys(x);
}

export function isObject<T>(value: T) {
  const type = typeof value;
  return !!value && (type === 'object' || type === 'function');
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function getItemsGroupById<T extends { id?: number }>(items: T[]) {
  return items.reduce((prev, item) => {
    if (!item.id) {
      throw new Error();
    }
    prev[item.id] = item;

    return prev;
  }, {} as Record<number, T>);
}

export function isComplexObjectArray<T>(array: T[] | number[]): array is T[] {
  return typeof array === 'object' && 'length' in array && array.length > 0 && typeof array[0] === 'object';
}

export function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 'n/a';
  }

  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024));

  if (i === 0) {
    return `${bytes} ${sizes[i]})`;
  }

  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

export async function getBase64SrcFromBlob(blob: Blob) {
  return  new Promise<string>(async (resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = async () => {
      resolve(reader.result as string);
    };
  });
}

/** String manipulation */
export function toFirstUppercase<T extends string>(value?: T) {
  if (!value) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.substring(1);
}

export function ellipsisString(value: string, length: number) {
  return value.length > length ? value.substr(0, length) + ' ...' : value;
}
