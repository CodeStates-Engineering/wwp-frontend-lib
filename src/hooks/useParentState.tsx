import { useEffect, useMemo, useState } from 'react';
import { useMountedEffect } from './useMountedEffect';
import { useDebouncedFunction } from './useDebouncedFunction';
/**undefined을 제외한 값을 받으면 setter를 반환하지 않는다.*/
export function useParentState<T>(
  factory: () => T,
  deps?: React.DependencyList,
  stateSync: boolean = false
) {
  const initialValue = useMemo(factory, stateSync ? undefined : deps),
    state = useState(initialValue),
    [, setValue] = state;

  useMountedEffect(() => {
    !stateSync && setValue(initialValue);
  }, [initialValue, setValue]);

  if (stateSync && initialValue !== undefined) return [initialValue] as [Exclude<T, undefined>];
  return state;
}
