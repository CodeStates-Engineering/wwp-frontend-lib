import { Calendar } from "react-feather";
import { format } from "date-fns";
import { DayPicker, DayPickerProps, Matcher } from "react-day-picker";

import ko from "date-fns/locale/ko";
import "react-day-picker/dist/style.css";
import scss from "./DateSelectbox.module.scss";
import { useOpenedStateWithCloseExternalClick, useParentState } from "@hooks";
import { cleanClassName } from "@utils";

export interface DateSelectboxProps {
  value?: Date;
  id?: string;
  withTime?: boolean;
  className?: string;
  invalid?: boolean;
  disabledDates?: Matcher | Matcher[];
  disabled?: boolean;
  defaultMonth?: DayPickerProps["defaultMonth"];
  openDirection?: ["up" | "down", "left" | "right"];
  placeholder?: string;
  onChange?: (value?: Date) => void;
  fitContainer?: boolean;
}

//TODO: 미완성 컴포넌트 추후 DateRangeSelectbox 참고해서 개발 완료 해야함
export function DateSelectbox({
  withTime,
  onChange,
  disabled,
  defaultMonth,
  className,
  id,
  disabledDates,
  placeholder,
  value,
  invalid,
  openDirection: [upDown, leftRight] = ["down", "left"],
  fitContainer,
}: DateSelectboxProps) {
  const dateFormat = withTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
  const {
    openedState: [calendarOpened, setCalendarOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);
  const [date, setDate] = useParentState(value);

  return (
    <div
      className={cleanClassName(
        `${scss.datebox_container} ${fitContainer && scss.fit_container}`
      )}
    >
      <button
        type="button"
        id={id}
        className={cleanClassName(
          `${scss.datebox} ${calendarOpened && scss.opened} ${
            invalid && scss.invalid
          } ${fitContainer && scss.fit_container} ${className}`
        )}
        disabled={disabled}
        onClick={() => {
          setCalendarOpened(!calendarOpened);
        }}
        {...preventCloseProps}
      >
        <div className={scss.date_text_wrap}>
          {date ? (
            format(date, dateFormat)
          ) : (
            <span className={scss.placeholder}>{placeholder}</span>
          )}
        </div>
        <div className={scss.calendar_icon_wrap}>
          <Calendar />
        </div>
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
            defaultMonth={defaultMonth ?? date}
            selected={date}
            onSelect={(date: Date | undefined) => {
              setDate(date);
              onChange?.(date);
              setCalendarOpened(false);
            }}
          />
        </section>
      )}
    </div>
  );
}
