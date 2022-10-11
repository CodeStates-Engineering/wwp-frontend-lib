import scss from './Selectbox.module.scss';
import { Check, ChevronUp, ChevronDown } from 'react-feather';
import { useOpenedStateWithCloseExternalClick, useDepsState, useParentState } from '@hooks';
import { cleanClassName } from '@utils';
import { useMemo } from 'react';

export interface PairOption<T> {
  label: string;
  value: T;
}

export type OptionHint = string | PairOption<any>;

export interface SelectboxProps<T extends OptionHint> {
  value?: T extends PairOption<infer U> ? PairOption<U>['value'] : T;
  onChange?: (value: T extends PairOption<infer U> ? PairOption<U>['value'] : T) => void;
  options?: T extends PairOption<infer U> ? PairOption<U>[] : T[];
  openDirection?: ['up' | 'down', 'left' | 'right'];
  placeholder?: string;
  optionsIncludePlaceholder?: boolean;
  name?: string;
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  width?: React.CSSProperties['width'];
  theme?: 'linear' | 'box';
  modifier?: 'system' | 'readonly' | 'user';
  valueSync?: boolean;
}

export function Selectbox<T extends OptionHint>({
  placeholder = '옵션을 선택해주세요.',
  onChange,
  id,
  invalid,
  name,
  openDirection: [upDown, leftRight] = ['down', 'left'],
  value,
  width = '246px',
  modifier = 'user',
  options,
  theme = 'box',
  optionsIncludePlaceholder = false,
  disabled,
  valueSync,
}: SelectboxProps<T>) {
  const _options = useMemo(() => {
    if (!options) return [];
    const initOptions = optionsIncludePlaceholder ? [{ label: placeholder, value: null }] : [];
    const objectOptions = options.map((option) =>
      typeof option === 'string' ? { label: option, value: option } : option
    );
    return [...initOptions, ...objectOptions];
  }, [options, optionsIncludePlaceholder, placeholder]);

  const {
    openedState: [optionsOpened, setOptionsOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  const [selectedValue, setSelectedValue] = useParentState(() => value, [value], valueSync);

  const selectedLabel = _options.find(({ value }) => value === selectedValue)?.label;

  const isFilled = selectedLabel !== undefined && selectedValue !== null;

  const _disabled = modifier === 'user' ? disabled : true;

  return (
    <div className={scss.selectbox_wrap} style={{ width }}>
      <button
        name={name}
        id={id}
        className={cleanClassName(
          `${scss.selectbox} ${invalid && scss.invalid} ${isFilled && scss.filled} ${
            optionsOpened && scss.opened
          } ${scss[theme]} ${scss[modifier]}`
        )}
        onClick={() => setOptionsOpened(!optionsOpened)}
        type="button"
        disabled={_disabled}
        {...preventCloseProps}
      >
        <div className={scss.selectbox_value}>{isFilled ? selectedLabel : placeholder}</div>
        {modifier !== 'readonly' && (upDown === 'down' ? <ChevronDown /> : <ChevronUp />)}
      </button>
      <ul
        className={cleanClassName(
          `${scss.options} ${!optionsOpened && scss.hidden} ${scss[upDown]} ${scss[leftRight]}`
        )}
        {...preventCloseProps}
      >
        <li className={`${scss.empty_space} ${scss.top}`} />
        {0 < _options.length ? (
          _options.map(({ label, value }, index) => (
            <li key={index}>
              <button
                className={scss.item_button}
                onClick={() => {
                  if (value !== selectedValue) {
                    setSelectedValue?.(value);
                    onChange?.(value);
                  }
                  setOptionsOpened(false);
                }}
                type="button"
              >
                <Check className={scss.check} />
                {label}
              </button>
            </li>
          ))
        ) : (
          <li className={scss.no_options}>선택 가능한 옵션이 없습니다.</li>
        )}
        <li className={`${scss.empty_space} ${scss.bottom}`} />
      </ul>
    </div>
  );
}
