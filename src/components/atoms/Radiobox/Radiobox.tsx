import { useParentState } from '../../../hooks';
import { cleanClassName } from '../../../utils';
import scss from './Radiobox.module.scss';

import { useMemo } from 'react';

export interface RadioboxOption<T> {
  label: string;
  value: T;
  children?: React.ReactNode;
  reverse?: boolean;
  disabled?: boolean;
}

export type RadioboxOptionHint = string | RadioboxOption<any>;

export interface RadioboxProps<T extends RadioboxOptionHint> {
  value?: T extends RadioboxOption<infer U> ? RadioboxOption<U>['value'] : T;
  onChange?: (
    value: T extends RadioboxOption<infer U> ? RadioboxOption<U>['value'] | undefined : T
  ) => void;
  id?: string;

  options?: T extends RadioboxOption<infer U> ? RadioboxOption<U>[] : T[];
  valueSync?: boolean;
  gap?: {
    in?: React.CSSProperties['gap'];
    out?: React.CSSProperties['gap'];
  };
  width?: React.CSSProperties['width'];
}
export function Radiobox<T extends RadioboxOptionHint>({
  options: originalOptions,
  id,
  value,
  onChange,

  valueSync,
  gap,
  width,
}: RadioboxProps<T>) {
  const [selectedValue, setSelectedValue] = useParentState(() => value, [value], valueSync);
  const options = useMemo(() => {
    return originalOptions?.map((option) => {
      return typeof option === 'string' ? { label: option, value: option } : option;
    });
  }, [originalOptions]);

  const innerGap = {
    gap: gap?.in ?? '18px',
  };

  return (
    <ul
      style={{ gap: gap?.out ?? '30px', width }}
      className={cleanClassName(scss.radiobox_list)}
      id={id}
    >
      {options?.map(({ label, value, reverse, children, disabled }, index) => {
        const checked = selectedValue === value;
        return (
          <li key={index} style={innerGap}>
            <label
              className={cleanClassName(
                `${scss.radio_label} ${reverse && scss.reverse} ${checked && scss.checked} ${
                  disabled && scss.disabled
                }`
              )}
              style={innerGap}
            >
              <input
                type="radio"
                name={id}
                value={value}
                checked={selectedValue === value}
                disabled={disabled}
                onChange={() => {
                  setSelectedValue?.(value);
                  onChange?.(value);
                }}
              />
              {label}
            </label>
            {children}
          </li>
        );
      })}
    </ul>
  );
}
