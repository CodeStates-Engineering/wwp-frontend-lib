import { useMemo } from 'react';

export function useValidationStorage() {
  const validationMap = useMemo(() => new Map<string, () => boolean>(), []);
  return {
    check: () => {
      const invalidKeys: string[] = [];
      for (const [key, check] of validationMap) if (!check()) invalidKeys.push(key);
      return invalidKeys;
    },
    set: (key: string, value: () => boolean) => validationMap.set(key, value),
    delete: (key: string) => validationMap.delete(key),
  };
}

export type ValidationStorage = ReturnType<typeof useValidationStorage>;
