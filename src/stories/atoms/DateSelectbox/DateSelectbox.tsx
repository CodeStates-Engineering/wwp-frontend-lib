import { Calendar } from 'react-feather';
import { format } from 'date-fns';
import { checkStringDate } from '@utils';
import { DayPicker, Matcher } from 'react-day-picker';

import ko from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';
import scss from './DateSelectbox.module.scss';
import {
  useOpenedStateWithCloseExternalClick,
  useParentState,
  useDepsState,
} from '@hooks';
import { cleanClassName } from '@utils';
import { useCallback, useEffect } from 'react';

export interface DateSelectboxProps {
  value?: Date | null;
  id?: string;
  withTime?: boolean;
  invalid?: boolean;
  disabledDates?: Matcher | Matcher[];
  disabled?: boolean;
  openDirection?: ['up' | 'down', 'left' | 'right'];
  placeholder?: string;
  onChange?: (value: Date | null) => void;
  theme?: 'linear' | 'box';
  width?: React.CSSProperties['width'];
  modifier?: 'system' | 'readonly' | 'user';
}

export function DateSelectbox({
  withTime,
  onChange,
  disabled,
  id,
  disabledDates,
  placeholder,
  value,
  invalid,
  openDirection: [upDown, leftRight] = ['down', 'left'],
  theme = 'box',
  width = '246px',
  modifier = 'user',
}: DateSelectboxProps) {
  const _placeholder =
    placeholder ?? withTime ? 'YYYY-MM-DD HH:MM' : 'YYYY-MM-DD';

  const _disabled = modifier === 'user' ? disabled : true;

  const {
    openedState: [calendarOpened, setCalendarOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  const [date, setDate] = useParentState(value),
    handleDateChange = (date: Date | null) => {
      setDate(date);
      onChange?.(date);
    };

  const formatDate = useCallback(
    (date: Date) => format(date, withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'),
    [withTime],
  );

  const [dateString, setDateString] = useDepsState(
    () => (value ? formatDate(value) : undefined),
    [value],
  );

  const checkNumberArray = (stringArray: string[]) =>
    stringArray.every((string) => !isNaN(Number(string)));

  useEffect(() => {
    !calendarOpened && setDateString(date ? formatDate(date) : undefined);
  }, [calendarOpened]);
  console.log(date);
  return (
    <div className={scss.datebox_container} style={{ width }}>
      <div
        id={id}
        className={cleanClassName(
          `${scss.datebox} ${date && scss.filled} ${
            calendarOpened && scss.opened
          } ${_disabled && scss.disabled} ${invalid && scss.invalid} ${
            scss[modifier]
          } ${scss[theme]}`,
        )}
        {...preventCloseProps}
      >
        <div className={scss.date_text_wrap}>
          <input
            value={dateString}
            placeholder={_placeholder}
            disabled={_disabled}
            onClick={() => {
              setCalendarOpened(true);
            }}
            onChange={(e) => {
              const { value } = e.target;

              if (value === '') {
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
                  const [date, time] = value.split(' ');
                  checkNumberArray([
                    ...date.split('-'),
                    ...(time ? time.split(':') : []),
                  ]) && selectDate(value);
                } else if (checkNumberArray(value.split('-')))
                  selectDate(value);
              }
            }}
          />
        </div>
        {modifier !== 'readonly' && <Calendar />}
      </div>
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
