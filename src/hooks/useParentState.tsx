import { useEffect, useState } from 'react';

/**undefined을 제외한 값을 받으면 setter를 반환하지 않는다.*/
export function useParentState<T>(value: T) {
  const state = useState(value);
  if (value !== undefined) return [value] as [Exclude<T, undefined>];
  else return state;
}
