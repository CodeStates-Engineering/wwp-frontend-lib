import { debounce } from 'lodash-es';
import { useEffect, useState, useMemo, useCallback } from 'react';

export function useDebouncedValue<T>(factory: () => T, deps?: React.DependencyList, wait = 500) {
  // eslint-disable-next-line
  const [value, setValue] = useState<T>(useMemo(factory, []));
  // eslint-disable-next-line
  const setDebouncedValue = useCallback(
    debounce((factory) => setValue(factory()), wait),
    [setValue, wait]
  );
  // eslint-disable-next-line
  useEffect(() => setDebouncedValue(factory), deps ? deps : [factory, setDebouncedValue]);
  return value;
}
