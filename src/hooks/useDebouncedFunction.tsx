import { debounce } from 'lodash-es';
import { useCallback } from 'react';

export function useDebouncedFunction<T extends (value: any) => any>(
  fn: T,
  deps: React.DependencyList,
  wait = 500
) {
  return useCallback(debounce(fn, wait), deps);
}
