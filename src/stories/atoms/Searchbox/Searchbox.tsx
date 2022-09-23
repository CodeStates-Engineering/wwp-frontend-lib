import {
  useOpenedStateWithCloseExternalClick,
  useDepsState,
  useDebouncedValue,
  useDebouncedFunction,
} from "@hooks";

import scss from "./Searchbox.module.scss";
import { Check, Search } from "react-feather";
import { cleanClassName } from "@utils";
import { useMemo } from "react";

import type { PairOption, OptionHint } from "../Selectbox/Selectbox";

type StandardizeString = (inputText: string) => string;

export interface SearchboxProps<T extends OptionHint> {
  /**options을 제공하지 않는 경우 value는 입력값입니다.*/
  value?: T extends PairOption<infer U> ? PairOption<U>["value"] : T;
  /**options을 제공하지 않는 경우 onChange는 입력값을 받습니다.*/
  onChange?: (
    value?: T extends PairOption<infer U> ? PairOption<U>["value"] : T
  ) => void;
  /**
   * @type {string[]} - options props의 label과 value는 같은 값을 가진다.
   * @type {PairOption<T>[]} - onChange prop은 options prop 선택값의 value를 받고 value prop은 선택한 options prop의 value이다.
   */
  options?: T extends PairOption<infer U> ? PairOption<U>[] : T[];
  optionsFixed?: boolean;
  placeholder?: string;
  onlyPerfectMatch?: boolean;
  name?: string;
  openDirection?: ["up" | "down", "left" | "right"];
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  theme?: "linear" | "box";
  modifier?: "system" | "readonly" | "user";
  width?: React.CSSProperties["width"];
}

export function Searchbox<T extends OptionHint>({
  onChange,
  placeholder = "검색어를 입력하세요",
  value,
  openDirection: [upDown, leftRight] = ["down", "left"],
  options: originalOptions,
  theme = "box",
  modifier = "user",
  width = "246px",
  ...restProps
}: SearchboxProps<T>) {
  const disabled = modifier === "user" ? restProps.disabled : true;
  const options = useMemo(
    () =>
      originalOptions?.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option
      ) ?? [],
    [originalOptions]
  );
  const [searchValue, setSearchValue] = useDepsState(() => {
    if (options.length === 0 && typeof value === "string") {
      return {
        inputValue: value,
        selectedOption: {
          label: value,
          value,
        },
      };
    }
    const selectedOption = options.find((option) => option.value === value);

    return {
      inputValue: selectedOption?.label ?? "",
      selectedOption,
    };
  }, [options, value]);
  const { inputValue, selectedOption } = searchValue;
  const isFilled = inputValue && inputValue === selectedOption?.label;

  const {
    openedState: [optionsOpened, setOptionsOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  const filteredOptions = useDebouncedValue(() => {
    if (!options) return [];
    if (restProps.optionsFixed) return options;

    const standardizeString: StandardizeString = restProps.onlyPerfectMatch
      ? (inputValue) => inputValue
      : (inputValue) =>
          inputValue.toLowerCase().replace(/[^a-z0-9가-힣]/gi, "");

    const standardizedInputText = standardizeString(inputValue);

    for (let i = 0; i < standardizedInputText.length; i++) {
      const filteredOptions = options.filter(({ label }) =>
        standardizeString(label).includes(
          i ? standardizedInputText.slice(0, -i) : standardizedInputText
        )
      );

      if (0 < filteredOptions.length) return filteredOptions;
    }

    return options;
  }, [inputValue, options]);

  const onChangeInputValue = useDebouncedFunction(
    options.length === 0 && onChange ? onChange : () => {}
  );

  return (
    <>
      <div className={`${scss.searchbox_wrap}`} style={{ width }}>
        <div
          className={cleanClassName(
            `${scss.searchbox} ${scss[theme]} ${
              optionsOpened && scss.searching
            } ${disabled && scss.disabled} ${modifier && scss[modifier]} ${
              restProps.invalid && scss.invalid
            } ${isFilled && scss.filled} `
          )}
        >
          <div className={scss.input_wrap}>
            <input
              value={inputValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                setSearchValue({ ...searchValue, inputValue });
                onChangeInputValue(
                  inputValue as T extends PairOption<infer U> ? U : T
                );
                if (!inputValue) onChange?.(undefined);
              }}
              {...preventCloseProps}
              placeholder={placeholder}
              name={restProps.name}
              id={restProps.id}
              onClick={() => setOptionsOpened(true)}
              disabled={disabled}
            />
          </div>
          <Search />
        </div>
        {0 < filteredOptions.length && optionsOpened && (
          <ul
            className={`${scss.options} ${scss[upDown]} ${scss[leftRight]}`}
            {...preventCloseProps}
          >
            {filteredOptions.map((option, index) => (
              <li key={`${index}-${option.value}`}>
                <button
                  className={scss.item_button}
                  onClick={() => {
                    setSearchValue({
                      inputValue: option.label,
                      selectedOption: option,
                    });
                    onChange?.(option.value);
                    setOptionsOpened(false);
                  }}
                >
                  <Check className={scss.check} />
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
