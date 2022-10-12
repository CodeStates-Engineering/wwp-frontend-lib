import { useState, useEffect, useCallback } from 'react';
import { useMountedEffect } from './useMountedEffect';
import type { ValidationStorage } from './useValidationStorage';

export type Validation<T> = (value: T) => string | undefined;

export function useValidation<T>(
  value: T,
  validation: (value: T) => string | undefined,
  storageKey: string | undefined,
  validationStorage: ValidationStorage | undefined
) {
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [checkedValue, setCheckedValue] = useState(value);

  const checkValidation = useCallback(
    (value: T) => {
      setValidated(true);
      setCheckedValue(value);
      const _message = validation?.(value);
      setMessage(_message ?? '');
      return !_message;
    },
    [setValidated, validation]
  );

  useMountedEffect(() => {
    setCheckedValue(value);
  }, [setCheckedValue, value]);

  useEffect(() => {
    if (!validationStorage) return () => {};
    if (storageKey) {
      validationStorage.set(storageKey, () => checkValidation?.(checkedValue));
      return () => validationStorage.delete(storageKey);
    }
  });

  return { invalid: !!(message && validated), message, checkValidation };
}
