import { cloneDeepWith } from 'lodash-es';

export function cloneDeepPartial<T>(value: T) {
  return cloneDeepWith(value, (keyValue, key) => {
    return keyValue;
  });
}
