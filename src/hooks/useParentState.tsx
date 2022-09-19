import { useEffect, useState } from 'react';

/**
 * param으로 전달 받은 값을 구독하여 상태를 업데이트 해줌
 */
export function useParentState<T>(value: T) {
  const state = useState(value),
    setValue = state[1];
  useEffect(() => setValue(value), [value, setValue]);
  return state;
}
