import { useState, useEffect, useCallback } from 'react';
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

  const checkValidation = useCallback(
    (value: T) => {
      setValidated(true);
      const _message = validation?.(value);
      setMessage(_message ?? '');
      return !_message;
    },
    [setValidated, validation]
  );

  useEffect(() => {
    if (!validationStorage) return () => {};
    if (storageKey) {
      validationStorage.set(storageKey, () => checkValidation?.(value));
      return () => validationStorage.delete(storageKey);
    }
  });

  return { invalid: !!(message && validated), message, checkValidation };
}
