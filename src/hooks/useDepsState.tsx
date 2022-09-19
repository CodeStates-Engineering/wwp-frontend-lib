import { useEffect, useMemo, useState } from 'react';

/**
 * deps로 전달 받은 값을 구독하여 상태 업데이트
 */
export function useDepsState<T>(factory: () => T, deps: React.DependencyList) {
  // eslint-disable-next-line
  const initialValue = useMemo(factory, deps);
  const state = useState(initialValue),
    setValue = state[1];
  useEffect(() => setValue(initialValue), [initialValue, setValue]);

  return state;
}
