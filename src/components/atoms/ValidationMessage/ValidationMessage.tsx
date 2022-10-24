import scss from './ValidationMessage.module.scss';
import type { useValidation } from '../../../hooks';
import { cleanClassName } from '../../../utils';

export type ValidationMessageProps = Omit<ReturnType<typeof useValidation>, 'checkValidation'>;

/**@deprecated InputDescription 컴포넌트를 사용해주세요. */
export function ValidationMessage({ message, invalid }: ValidationMessageProps) {
  return (
    <p className={cleanClassName(`${scss.validation_message} ${invalid && scss.visible}`)}>
      {message || '유효한 값입니다.'}
    </p>
  );
}
