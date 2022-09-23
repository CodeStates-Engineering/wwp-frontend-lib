import { Calendar } from "react-feather";
import { format } from "date-fns";
import { checkStringDate } from "@utils";
import { DayPicker, DayPickerProps, Matcher } from "react-day-picker";

import ko from "date-fns/locale/ko";
import "react-day-picker/dist/style.css";
import scss from "./DateSelectbox.module.scss";
import {
  useOpenedStateWithCloseExternalClick,
  useParentState,
  useDepsState,
} from "@hooks";
import { cleanClassName } from "@utils";
import { useCallback, useEffect } from "react";

export interface DateSelectboxProps {
  value?: Date | null;
  id?: string;
  withTime?: boolean;
  invalid?: boolean;
  disabledDates?: Matcher | Matcher[];
  disabled?: boolean;
  openDirection?: ["up" | "down", "left" | "right"];
  placeholder?: string;
  onChange?: (value: Date | null) => void;
  width?: React.CSSProperties["width"];
}

export function DateSelectbox({
  withTime,
  onChange,
  disabled,
  id,
  disabledDates,
  placeholder = "YYYY-MM-DD",
  value,
  invalid,
  openDirection: [upDown, leftRight] = ["down", "left"],
  width = "150px", //"246px"
}: DateSelectboxProps) {
  const {
    openedState: [calendarOpened, setCalendarOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  const [date, setDate] = useParentState(value),
    handleDateChange = (date: Date | null) => {
      setDate(date);
      onChange?.(date);
    };

  const isFilled = date !== undefined;

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
    <div className={scss.datebox_container} style={{ width }}>
      <button
        type="button"
        id={id}
        className={cleanClassName(
          `${scss.datebox} ${calendarOpened && scss.opened} ${
            invalid && scss.invalid
          }`
        )}
        disabled={disabled}
        onClick={() => {
          setCalendarOpened(!calendarOpened);
        }}
        {...preventCloseProps}
      >
        <div className={scss.date_text_wrap}>
          <input
            value={dateString}
            placeholder={placeholder}
            onChange={(e) => {
              const { value } = e.target;

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
                  checkNumberArray([...date.split("-"), ...time.split(":")]) &&
                    selectDate(value);
                } else if (checkNumberArray(value.split("-")))
                  selectDate(value);
              }
            }}
          />
        </div>
        <Calendar />
      </button>
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
