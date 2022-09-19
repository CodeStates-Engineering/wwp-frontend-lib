import { debounce } from 'lodash-es';
import { useCallback } from 'react';

export function useDebouncedFunction<T extends (value: any) => any>(fn: T, wait = 500) {
  // eslint-disable-next-line
  return useCallback(debounce(fn, wait), [fn, wait]);
}
