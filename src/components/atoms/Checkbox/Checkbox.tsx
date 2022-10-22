import scss from './Checkbox.module.scss';
import { Check, Minus, X } from 'react-feather';
import { useMountedEffect, useParentState } from '../../../hooks';
import { cleanClassName } from '../../../utils';

export interface CheckboxProps {
  className?: string;
  value?: boolean | null;
  onChange?: (checked: CheckboxProps['value']) => void;
  name?: string;
  disabled?: boolean;
  id?: string;
  valueSync?: boolean;
}

export function Checkbox({ value, onChange, className, name, disabled, valueSync }: CheckboxProps) {
  const [checkedValue, setCheckedValue] = useParentState(() => value, [value], valueSync);
  const isIndeterminate = checkedValue === null;
  const CheckboxIcon = () =>
    isIndeterminate ? <Minus /> : checkedValue ? <Check /> : disabled ? <X /> : <></>;

  useMountedEffect(() => {
    if (isIndeterminate) onChange?.(null);
  }, [isIndeterminate]);

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
