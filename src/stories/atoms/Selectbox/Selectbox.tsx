import scss from "./Selectbox.module.scss";
import { Check, ChevronUp, ChevronDown } from "react-feather";
import { useOpenedStateWithCloseExternalClick, useDepsState } from "@hooks";
import { cleanClassName } from "@utils";
import { useMemo } from "react";

export interface PairOption<T> {
  label: string;
  value: T;
}

export type OptionHint = string | PairOption<any>;

export interface SelectboxProps<T extends OptionHint> {
  value?: T extends PairOption<infer U> ? PairOption<U>["value"] : T;
  onChange?: (
    value: T extends PairOption<infer U> ? PairOption<U>["value"] : T
  ) => void;
  options?: T extends PairOption<infer U> ? PairOption<U>[] : T[];
  openDirection?: ["up" | "down", "left" | "right"];
  placeholder?: string;
  optionsIncludePlaceholder?: boolean;
  name?: string;
  fitContainer?: boolean;
  id?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
}

export function Selectbox<T extends OptionHint>({
  placeholder = "",
  onChange,
  className,
  disabled,
  id,
  invalid,
  name,
  openDirection: [upDown, leftRight] = ["down", "left"],
  fitContainer,
  value,
  options: originalOptions,
  optionsIncludePlaceholder = false,
}: SelectboxProps<T>) {
  const options = useMemo(() => {
    if (!originalOptions) return [];
    const initOptions = optionsIncludePlaceholder
      ? [{ label: placeholder, value: null }]
      : [];
    const objectOptions = originalOptions.map((option) =>
      typeof option === "string" ? { label: option, value: option } : option
    );
    return [...initOptions, ...objectOptions];
  }, [originalOptions, optionsIncludePlaceholder, placeholder]);

  const {
    openedState: [optionsOpened, setOptionsOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  const [selectedValue, setSelectedValue] = useDepsState(() => value, [value]);

  const label =
    options.find(({ value }) => value === selectedValue)?.label ?? placeholder;

  const fitContainerClassName = fitContainer ? scss.fit_container : "";

  return (
    <div
      className={cleanClassName(
        `${scss.selectbox_wrap} ${fitContainerClassName}`
      )}
    >
      <button
        name={name}
        id={id}
        className={cleanClassName(
          `${scss.selectbox} ${optionsOpened && scss.opened} ${
            invalid && scss.invalid
          } ${fitContainerClassName} ${className}`
        )}
        onClick={() => setOptionsOpened(!optionsOpened)}
        type="button"
        disabled={disabled}
        {...preventCloseProps}
      >
        <div
          className={cleanClassName(
            `${scss.selectbox_value} ${
              (!selectedValue || selectedValue === placeholder) &&
              placeholder &&
              scss.placeholder
            }`
          )}
        >
          {label}
        </div>
        {upDown === "down" ? <ChevronDown /> : <ChevronUp />}
      </button>
      <ul
        className={cleanClassName(
          `${scss.options} ${!optionsOpened && scss.hidden} ${scss[upDown]} ${
            scss[leftRight]
          }`
        )}
        {...preventCloseProps}
      >
        <li className={`${scss.empty_space} ${scss.top}`} />
        {0 < options.length ? (
          options.map(({ label, value }, index) => (
            <li key={index}>
              <button
                className={scss.item_button}
                onClick={() => {
                  if (value !== selectedValue) {
                    setSelectedValue(value);
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
          <li>선택 가능한 옵션이 없습니다.</li>
        )}
        <li className={`${scss.empty_space} ${scss.bottom}`} />
      </ul>
    </div>
  );
}
