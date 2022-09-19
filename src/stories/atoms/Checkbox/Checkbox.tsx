import scss from "./Checkbox.module.scss";
import { Check, Minus, X } from "react-feather";
import { useParentState } from "@hooks";
import { cleanClassName } from "@utils";

export interface CheckboxProps {
  className?: string;
  value?: boolean | "half";
  onChange?: (checked: boolean) => void;
  name?: string;
  disabled?: boolean;
  id?: string;
}

export function Checkbox({
  value = false,
  onChange,
  className,
  name,
  disabled,
}: CheckboxProps) {
  const [checkedValue, setCheckedValue] = useParentState(value);

  const isCheckedHalf = checkedValue === "half";

  const CheckboxIcon = () =>
    isCheckedHalf ? (
      <Minus />
    ) : checkedValue ? (
      <Check />
    ) : disabled ? (
      <X />
    ) : (
      <></>
    );

  return (
    <div
      className={cleanClassName(
        `${scss.checkbox_container} ${
          disabled
            ? scss.disabled
            : isCheckedHalf
            ? scss.half
            : checkedValue && scss.checked
        } ${className}`
      )}
    >
      <div className={scss.checkbox_icon_wrap}>
        <CheckboxIcon />
      </div>
      <input
        type="checkbox"
        className={cleanClassName(
          `${scss.checkbox} ${disabled && scss.disabled}`
        )}
        name={name}
        checked={!!checkedValue}
        disabled={disabled}
        onChange={({ target: { checked } }) => {
          setCheckedValue(checked);
          onChange?.(checked);
        }}
      />
    </div>
  );
}
