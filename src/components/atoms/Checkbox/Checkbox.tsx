import scss from './Checkbox.module.scss';
import { Check, Minus, X } from 'react-feather';
import { useParentState } from '../../../hooks';
import { cleanClassName } from '../../../utils';

export interface CheckboxProps {
  value?: boolean | null;
  onChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  id?: string;
  valueSync?: boolean;
}

export function Checkbox({ value = false, onChange, name, disabled, valueSync }: CheckboxProps) {
  const [checkedValue, setCheckedValue] = useParentState(() => value, [value], valueSync);
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
        }`
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
