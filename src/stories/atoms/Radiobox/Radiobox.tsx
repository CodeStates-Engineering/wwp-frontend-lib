import { useParentState } from '@hooks';
import { cleanClassName } from '@utils';
import scss from './Radiobox.module.scss';
import type { PairOption, OptionHint } from '../Selectbox/Selectbox';
import { useMemo } from 'react';
export interface RadioboxProps<T extends OptionHint> {
  value?: T extends PairOption<infer U> ? PairOption<U>['value'] : T;
  onChange?: (
    value: T extends PairOption<infer U> ? PairOption<U>['value'] | undefined : T
  ) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  options: T extends PairOption<infer U> ? PairOption<U>[] : T[];
}
export function Radiobox<T extends OptionHint>({
  options: originalOptions,
  id,
  value,
  onChange,
  className,
  invalid,
}: RadioboxProps<T>) {
  const [selectedValue, setSelectedValue] = useParentState(value);
  const options = useMemo(() => {
    return originalOptions.map((option) => {
      return typeof option === 'string' ? { label: option, value: option } : option;
    });
  }, [originalOptions]);

  return (
    <ul
      className={cleanClassName(`${scss.radiobox_list} ${invalid && scss.invalid} ${className}`)}
      id={id}
    >
      {options.map(({ label, value }, index) => {
        return (
          <li key={index}>
            <label className={scss.radio_label}>
              <input
                type="radio"
                name={id}
                value={value}
                checked={selectedValue === value}
                onChange={() => {
                  setSelectedValue?.(value);
                  onChange?.(value);
                }}
              />
              <span>{label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
