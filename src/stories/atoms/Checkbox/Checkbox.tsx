import scss from './Checkbox.module.scss';
import { Check, Minus, X } from 'react-feather';
import { useParentState } from '@hooks';
import { cleanClassName } from '@utils';

export interface CheckboxProps {
  className?: string;
  value?: boolean | null;
  onChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  id?: string;
}

export function Checkbox({ value, onChange, className, name, disabled }: CheckboxProps) {
  const [checkedValue, setCheckedValue] = useParentState(value);
  const isIndeterminate = checkedValue === null;
  const CheckboxIcon = () =>
    isIndeterminate ? <Minus /> : checkedValue ? <Check /> : disabled ? <X /> : <></>;

  return (
    <div
      className={cleanClassName(
        `${scss.checkbox_container} ${
          disabled
            ? scss.disabled
            : isIndeterminate
            ? scss.indeterminate
            : checkedValue && scss.checked
        } ${className}`
      )}
    >
      <div className={scss.checkbox_icon_wrap}>
        <CheckboxIcon />
      </div>
      <input
        type="checkbox"
        className={cleanClassName(`${scss.checkbox} ${disabled && scss.disabled}`)}
        name={name}
        checked={checkedValue === null ? true : !!checkedValue}
        disabled={disabled}
        onChange={({ target: { checked } }) => {
          setCheckedValue?.(checked);
          onChange?.(checked);
        }}
      />
    </div>
  );
}
