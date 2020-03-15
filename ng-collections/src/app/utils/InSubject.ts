import equal from 'fast-deep-equal';

/**
 * Declares a property stored in a subject.
 *
 * Read/write accesses to the property are automatically forwarded to the subject.
 *
 * `InSubject` takes an optional parameter that specifies the name
 * of the property in which the data should be stored. When not provided,
 * the name of the decorated property suffixed with `Change` is used.
 *
 */
export function InSubject(optionalSubjectKey?: string): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const propertyKeyString = propertyKey.toString();
    const subjectKey = optionalSubjectKey || `${propertyKeyString}Change`;
    const prop = Object.getOwnPropertyDescriptor(target, propertyKey);
    if (prop) {
      console.warn(`The field '${target.constructor.name}.${propertyKeyString}' has a non-trivial property definition`);
      return;
    }
    Object.defineProperty(target, propertyKey, {
      get(this: any) {
        if ('value' in this[subjectKey]) {
          return this[subjectKey].value;
        } else {
          throw new Error(`${propertyKeyString} can only be set on ${this}`);
        }
      },
      set(this: any, v: any) {
        if (!this[subjectKey]) {
          return;
        }

        if (!('value' in this[subjectKey]) || !equal(this[subjectKey].value, v)) {
          this[subjectKey].next(v);
        }
      },
      configurable: true,
      enumerable: true,
    });
  };
}
