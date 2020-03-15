import { keys } from './general';

export function cleanNullableValue<T>(model: T, skipCheckProperties?: Array<keyof T>) {
  const cleanModel: Partial<T> = {};
  const isToSkip = (key: keyof T) => !!(skipCheckProperties && skipCheckProperties.find((p) => p === key));

  keys(model).forEach((key) => {
    if (model[key] !== null || isToSkip(key)) {
      cleanModel[key] = model[key];
    }
  });
  return cleanModel;
}
