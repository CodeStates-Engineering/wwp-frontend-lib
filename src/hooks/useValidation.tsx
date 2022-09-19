import { useState, useEffect, useCallback } from 'react';
import type { ValidationStorage } from './useValidationStorage';

export interface Validation<T> {
  rule: (value: T) => boolean;
  message: string;
}

export function useValidation<T>(
  value: T,
  validations: Validation<T>[] | undefined,
  storageKey: string | undefined,
  validationStorage: ValidationStorage | undefined
) {
  const [validated, setValidated] = useState<boolean | 'never-try'>('never-try');
  const [visableMessage, setVisableMessage] = useState<string>();

  let checkedValue = value;
  const checkValidation = useCallback(
    (value: T) => {
      if (!validations) return true;
      let _validated = true;
      let _message: string | undefined;
      for (const { rule, message } of validations)
        if (!rule(value)) {
          _validated = false;
          _message = message;
          break;
        }
      //? 굳이 memorize 될 필요가 없는 값
      // eslint-disable-next-line
      checkedValue = value;
      setValidated(_validated);
      setVisableMessage(_message);
      return _validated;
    },
    [validations]
  );

  useEffect(() => {
    if (checkValidation(value)) return;
    setValidated('never-try');
    setVisableMessage(undefined);
  }, [value, checkValidation]);

  useEffect(() => {
    if (validationStorage && storageKey) {
      validationStorage.set(storageKey, () => checkValidation(checkedValue));
      return () => validationStorage.delete(storageKey);
    }
    return () => {};
  }, [validationStorage, checkValidation, checkedValue, storageKey]);

  return { validated, visableMessage, checkValidation };
}

export interface ValidationResult<T>
  extends Omit<ReturnType<typeof useValidation>, 'checkValidation'> {
  checkValidation: (value: T) => boolean;
}
