import { Calendar } from "react-feather";
import { format } from "date-fns";
import { checkStringDate } from "@utils";
import { DayPicker, Matcher } from "react-day-picker";

import ko from "date-fns/locale/ko";
import "react-day-picker/dist/style.css";
import scss from "./DateSelectbox.module.scss";
import {
  useOpenedStateWithCloseExternalClick,
  useParentState,
  useDepsState,
} from "@hooks";
import type { OpenedStateWithCloseExternalClick } from "@hooks";
import { cleanClassName } from "@utils";
import { useCallback, useEffect, useState } from "react";

interface DateInputProps {
  value?: Date | null;
  withTime?: boolean;
  disabledDates?: Matcher | Matcher[];
  disabled?: boolean;
  openDirection?: ["up" | "down", "left" | "right"];
  onChange?: (value: Date | null) => void;
  placeholder?: string;
  openStateWithCloseExternalClick: OpenedStateWithCloseExternalClick;
  onFilled: (filled: boolean) => void;
}

function DateInput({
  withTime,
  onChange,
  disabled,
  disabledDates,
  placeholder,
  value,
  openDirection: [upDown, leftRight] = ["down", "left"],
  openStateWithCloseExternalClick,
  onFilled,
}: DateInputProps) {
  const _placeholder =
    placeholder ?? (withTime ? "YYYY-MM-DD HH:MM" : "YYYY-MM-DD");

  const {
    openedState: [calendarOpened, setCalendarOpened],
    preventCloseProps,
  } = openStateWithCloseExternalClick;

  const [date, setDate] = useParentState(value),
    handleDateChange = (date: Date | null) => {
      setDate(date);
      onChange?.(date);
    };

  useEffect(() => {
    onFilled(!!date);
  }, [date]);

  const formatDate = useCallback(
    (date: Date) => format(date, withTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"),
    [withTime]
  );

  const [dateString, setDateString] = useDepsState(
    () => (value ? formatDate(value) : undefined),
    [value]
  );

  const checkNumberArray = (stringArray: string[]) =>
    stringArray.every((string) => !isNaN(Number(string)));

  useEffect(() => {
    !calendarOpened && setDateString(date ? formatDate(date) : undefined);
  }, [calendarOpened]);

  return (
    <div className={scss.date_input_container}>
      <input
        value={dateString ?? ""}
        placeholder={_placeholder}
        disabled={disabled}
        onClick={() => {
          setCalendarOpened(true);
        }}
        className={scss.date_input}
        onChange={(e) => {
          const { value } = e.target;

          if (value === "") {
            handleDateChange(null);
            setDateString(undefined);
            return;
          }

          const refreshCalendar = (dateString?: string) => {
            setCalendarOpened(false);
            setTimeout(() => {
              setCalendarOpened(true);
              setDateString(dateString);
            });
          };

          const selectDate = (dateString: string) => {
            setDateString(dateString);
            if (checkStringDate(dateString)) {
              const previousYear = date?.getFullYear();
              const previousMonth = date?.getMonth();
              const selectedDate = new Date(value);
              const selectedYear = selectedDate.getFullYear();
              const selectedMonth = selectedDate.getMonth();
              handleDateChange(selectedDate);
              (previousYear !== selectedYear ||
                previousMonth !== selectedMonth) &&
                refreshCalendar(dateString);
            }
          };

          if (!dateString) {
            const today = formatDate(new Date());
            setDateString(today);
            setDate(new Date(today));
            refreshCalendar(today);
          } else {
            if (withTime) {
              const [date, time] = value.split(" ");
              checkNumberArray([
                ...date.split("-"),
                ...(time ? time.split(":") : []),
              ]) && selectDate(value);
            } else if (checkNumberArray(value.split("-"))) selectDate(value);
          }
        }}
      />
      {calendarOpened && (
        <section
          className={`${scss.calendar_modal} ${scss[upDown]} ${scss[leftRight]}`}
          {...preventCloseProps}
        >
          <DayPicker
            locale={ko}
            mode="single"
            disabled={disabledDates}
            defaultMonth={date ?? new Date()}
            selected={date ?? undefined}
            onSelect={(date: Date | undefined) => {
              handleDateChange(date ?? null);
              setCalendarOpened(false);
            }}
          />
        </section>
      )}
    </div>
  );
}

export interface DateRange {
  from?: Date | null;
  to?: Date | null;
}

export type DateType = "date" | "date-range";

type CommonDateInputProps = Omit<
  DateInputProps,
  | "value"
  | "onChange"
  | "openStateWithCloseExternalClick"
  | "onFilled"
  | "placeholder"
>;

interface DateRangePlaceholder {
  from?: string;
  to?: string;
}

export type DateSelectboxProps<T extends DateType> = CommonDateInputProps & {
  type: T;
  id?: string;
  invalid?: boolean;
  theme?: "linear" | "box";
  width?: React.CSSProperties["width"];
  modifier?: "system" | "readonly" | "user";
} & (T extends "date-range"
    ? {
        placeholder?: DateRangePlaceholder;
        value?: DateRange;
        onChange?: (value: DateRange) => void;
      }
    : {
        placeholder?: string;
        value?: Date | null;
        onChange?: (value: Date | null) => void;
      });

export function DateSelectbox<T extends DateType>({
  type = "date" as T,
  id,
  invalid = false,
  theme = "box",
  width = "246px",
  value,
  onChange,
  disabled,
  modifier = "user",
  placeholder,
  ...restProps
}: DateSelectboxProps<T>) {
  const _disabled = modifier === "user" ? disabled : true;

  const fromDateCalendarOpenState = useOpenedStateWithCloseExternalClick(false),
    toDateCalendarOpenState = useOpenedStateWithCloseExternalClick(false);

  const [fromCalendarOpened] = fromDateCalendarOpenState.openedState,
    [toCalendarOpened] = toDateCalendarOpenState.openedState;

  const [fromDateFilled, setFromDateFilled] = useState(false),
    [toDateFilled, setToDateFilled] = useState(false);

  const commonDateInputProps: CommonDateInputProps = {
    ...restProps,
    disabled: _disabled,
  };

  const CalendarIcon = () => {
    return modifier !== "readonly" ? (
      <div
        className={cleanClassName(
          `${scss.calendar_icon} ${type === "date-range" && scss.background}`
        )}
      >
        <Calendar />
      </div>
    ) : (
      <></>
    );
  };
  const [date] = useState<Date>();
  switch (type) {
    case "date-range": {
      const dateRangeValue = { ...value } as DateRange | undefined,
        handleDateRange = onChange as (value: DateRange) => void,
        dateRangePlaceholder = placeholder as DateRangePlaceholder | undefined;

      return (
        <div
          id={id}
          className={cleanClassName(
            `${scss.datebox} ${
              (fromCalendarOpened || toCalendarOpened) && scss.opened
            } ${(fromDateFilled || toDateFilled) && scss.filled} ${
              _disabled && scss.disabled
            } ${invalid && scss.invalid} ${scss[modifier]} ${scss[theme]}`
          )}
          style={{ width }}
        >
          <div
            className={cleanClassName(
              `${scss.date_range_input_container} ${scss[theme]} ${
                fromCalendarOpened && scss.opened
              } ${fromDateFilled && scss.filled} ${
                _disabled && scss.disabled
              } ${scss[modifier]}`
            )}
          >
            <DateInput
              {...commonDateInputProps}
              value={dateRangeValue?.from}
              placeholder={dateRangePlaceholder?.from}
              onChange={(date) => {
                value = { ...value, from: date };
                handleDateRange({
                  from: date,
                  to: dateRangeValue?.to,
                });
              }}
              onFilled={setFromDateFilled}
              openStateWithCloseExternalClick={fromDateCalendarOpenState}
            />
          </div>
          {modifier === "readonly" && (
            <div className={scss.readonly_text}>~</div>
          )}
          <div
            className={cleanClassName(
              `${scss.date_range_input_container} ${scss[theme]} ${
                toCalendarOpened && scss.opened
              } ${toDateFilled && scss.filled} ${_disabled && scss.disabled} ${
                scss[modifier]
              }`
            )}
          >
            <DateInput
              {...commonDateInputProps}
              value={dateRangeValue?.to}
              placeholder={dateRangePlaceholder?.to}
              onChange={(date) => {
                handleDateRange({
                  from: dateRangeValue?.from,
                  to: date,
                });
              }}
              onFilled={setToDateFilled}
              openStateWithCloseExternalClick={toDateCalendarOpenState}
            />
          </div>
          <CalendarIcon />
        </div>
      );
    }
    default: {
      const dateValue = value as Date | null | undefined,
        handleDate = onChange as (value: Date | null) => void,
        datePlaceholder = placeholder as string | undefined;

      return (
        <div
          id={id}
          className={cleanClassName(
            `${scss.datebox} ${toDateFilled && scss.filled} ${
              toCalendarOpened && scss.opened
            } ${_disabled && scss.disabled} ${invalid && scss.invalid} ${
              scss[modifier]
            } ${scss[theme]}`
          )}
          style={{ width }}
        >
          <DateInput
            {...commonDateInputProps}
            placeholder={datePlaceholder}
            value={dateValue}
            onChange={handleDate}
            onFilled={setToDateFilled}
            openStateWithCloseExternalClick={toDateCalendarOpenState}
          />
          <CalendarIcon />
        </div>
      );
    }
  }
}
