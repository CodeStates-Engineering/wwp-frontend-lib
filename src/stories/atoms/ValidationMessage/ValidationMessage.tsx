import scss from './ValidationMessage.module.scss';
import type { useValidation } from '@hooks';

export type ValidationMessageProps = Omit<ReturnType<typeof useValidation>, 'checkValidation'>;

export function ValidationMessage({ validated, visableMessage }: ValidationMessageProps) {
  return (
    <p className={`${scss.validation_message} ${!validated && scss.visible}`}>
      {visableMessage ?? 'null'}
    </p>
  );
}
