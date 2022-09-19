import { Calendar } from "react-feather";
import { format } from "date-fns";
import {
  DateRange,
  DayPicker,
  DayPickerProps,
  Matcher,
} from "react-day-picker";
import { RefreshCw } from "react-feather";
import ko from "date-fns/locale/ko";
import "react-day-picker/dist/style.css";
import scss from "./DateRangeSelectbox.module.scss";
import { useOpenedStateWithCloseExternalClick, useParentState } from "@hooks";
import { cleanClassName } from "@utils";

export interface DateRangeSelectboxProps {
  value: DateRange;
  id?: string;
  className?: string;
  invalid?: boolean;
  openDirection?: ["up" | "down", "left" | "right"];
  withTime?: boolean;
  disabledDates?: Matcher | Matcher[];
  defaultMonth?: DayPickerProps["defaultMonth"];
  onChange?: (value?: DateRange) => void;
  fitContainer?: boolean;
  disabled?: {
    from?: boolean;
    to?: boolean;
  };
}

export function DateRangeSelectbox({
  withTime,
  onChange,
  disabled: { from: disabledFrom, to: disabledTo } = { from: false, to: false },
  defaultMonth,
  className,
  id,
  value,
  disabledDates,
  openDirection: [upDown, leftRight] = ["down", "left"],
  invalid,
  fitContainer,
}: DateRangeSelectboxProps) {
  const [dateRange, setDateRange] = useParentState(value),
    fromDate = dateRange?.from,
    toDate = dateRange?.to;

  const dateFormat = withTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";

  const {
    openedState: [calendarOpened, setCalendarOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  const changeDateRange = (selectedDateRange: DateRange) => {
    setDateRange(selectedDateRange);
    onChange?.(selectedDateRange);
  };

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
          } ${withTime && scss.with_time} ${
            fitContainer && scss.fit_container
          } ${className}`
        )}
        disabled={disabledFrom && disabledTo}
        onClick={() => setCalendarOpened(!calendarOpened)}
        {...preventCloseProps}
      >
        <div
          className={cleanClassName(
            `${scss.date_text} ${disabledFrom && scss.disabled}`
          )}
        >
          {fromDate ? (
            format(fromDate, dateFormat)
          ) : (
            <span className={scss.placeholder}>시작일</span>
          )}
        </div>
        <div
          className={cleanClassName(
            `${scss.date_text} ${disabledFrom && scss.disabled}`
          )}
        >
          {toDate ? (
            format(toDate, dateFormat)
          ) : (
            <span className={scss.placeholder}>종료일</span>
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
            mode="range"
            selected={dateRange}
            disabled={disabledDates}
            defaultMonth={defaultMonth ?? disabledTo ? fromDate : toDate}
            onSelect={(dateRange: DateRange | undefined) =>
              changeDateRange({
                from: disabledFrom ? fromDate : dateRange?.from,
                to: disabledTo ? toDate : dateRange?.to,
              })
            }
          />
          <footer
            className={cleanClassName(
              `${scss.calendar_modal_footer} ${fromDate && toDate && scss.open}`
            )}
          >
            {fromDate && toDate && (
              <section className={scss.calendar_modal_contents}>
                <div className={scss.selected_date_container}>
                  <div>
                    <span>{format(fromDate, "yyyy-MM-dd")}</span>
                    <span>
                      <input
                        type="time"
                        value={format(fromDate, "HH:mm")}
                        className={scss.time_input}
                        disabled={disabledFrom}
                        onChange={(e) => {
                          const time = e.target.value;
                          const [hour, minute] = time.split(":");
                          if (!dateRange?.from) return;
                          dateRange.from.setHours(Number(hour));
                          dateRange.from.setMinutes(Number(minute));
                          changeDateRange({ ...dateRange });
                        }}
                      />
                    </span>
                    <span className={scss.time_type_text}>부터</span>
                  </div>
                  <div>
                    <span>{format(toDate, "yyyy-MM-dd")}</span>
                    <input
                      type="time"
                      className={scss.time_input}
                      value={format(toDate, "HH:mm")}
                      disabled={disabledTo}
                      onChange={(e) => {
                        const time = e.target.value;
                        const [hour, minute] = time.split(":");
                        if (!dateRange?.to || !time) return;
                        dateRange.to.setHours(Number(hour));
                        dateRange.to.setMinutes(Number(minute));
                        changeDateRange({ ...dateRange });
                      }}
                    />
                    <span className={scss.time_type_text}>까지</span>
                  </div>
                </div>
                <div className={scss.reset_button_container}>
                  <label htmlFor="reset">재설정</label>
                  <button
                    name="reset"
                    type="reset"
                    onClick={() => {
                      changeDateRange({
                        from: disabledFrom ? fromDate : undefined,
                        to: disabledTo ? toDate : undefined,
                      });
                      setCalendarOpened(false);
                    }}
                    className={scss.date_reset_button}
                  >
                    <RefreshCw />
                  </button>
                </div>
              </section>
            )}
          </footer>
        </section>
      )}
    </div>
  );
}
