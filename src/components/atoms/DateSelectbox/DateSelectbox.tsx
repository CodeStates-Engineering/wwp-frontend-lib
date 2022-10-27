import { Calendar } from 'react-feather';
import { format } from 'date-fns';
import { DayPicker, Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ko from 'date-fns/locale/ko';
import scss from './DateSelectbox.module.scss';
import {
  useOpenedStateWithCloseExternalClick,
  useDepsState,
  useParentState,
  useMountedEffect,
} from '../../../hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { cleanClassName } from '../../../utils';

export interface Period {
  from?: Date;
  to?: Date;
}

export type DateType = 'date' | 'date-range';
export type DateSelectboxProps<T extends DateType> = {
  type?: T;
  value?: T extends 'date' ? Period['from'] : Period;
  onChange?: (value: T extends 'date' | undefined ? Period['from'] : Period) => void;
  disabledDates?: Matcher | Matcher[];
  disabled?: boolean;
  withTime?: boolean;
  openDirection?: ['up' | 'down', 'left' | 'right'];
  placeholder?: T extends 'date' ? string : { from?: string; to?: string };
  width?: React.CSSProperties['width'];
  id?: string;
  theme?: 'box' | 'linear';
  modifier?: 'system' | 'readonly' | 'user';
  invalid?: boolean;
  valueSync?: boolean;
};

export function DateSelectbox<T extends DateType = 'date'>({
  type = 'date' as T,
  value,
  onChange,
  disabledDates,
  disabled,
  withTime = false,
  openDirection: [upDown, leftRight] = ['down', 'left'],
  placeholder,
  width = '246px',
  id,
  theme = 'box',
  modifier = 'user',
  invalid,
  valueSync,
}: DateSelectboxProps<T>) {
  const isDate = type === 'date';
  const isDisabled = modifier === 'user' ? disabled : true;

  const formatDate = useCallback(
    (date?: Date) => (date ? format(date, withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd') : ''),
    [withTime]
  );

  const generateToPeriodDate = useCallback(
    (value: DateSelectboxProps<T>['value']) => (): Period => {
      if (isDate)
        return {
          from: value as DateSelectboxProps<'date'>['value'],
        };
      else {
        const _value = value as DateSelectboxProps<'date-range'>['value'];
        return {
          from: _value?.from,
          to: _value?.to,
        };
      }
    },
    [isDate]
  );

  const [periodDate, setPeriodDate] = useParentState<Period>(
    generateToPeriodDate(value),
    [generateToPeriodDate, value],
    valueSync
  );

  const generateToPeriodString = useCallback(
    (value: DateSelectboxProps<T>['value']) => () => {
      if (isDate)
        return {
          from: formatDate(value as DateSelectboxProps<'date'>['value']),
          to: '',
        };
      else {
        const _value = value as DateSelectboxProps<'date-range'>['value'];
        return {
          from: formatDate(_value?.from),
          to: formatDate(_value?.to),
        };
      }
    },
    [formatDate, isDate]
  );

  const [periodString, setPeriodString] = useDepsState(generateToPeriodString(value), [
    value,
    formatDate,
    isDate,
  ]);

  const handleChange = (period: Period) => {
    if (isDate) {
      const _onChange = onChange as DateSelectboxProps<'date'>['onChange'];
      _onChange?.(period.from);
    } else {
      const _onChange = onChange as DateSelectboxProps<'date-range'>['onChange'];
      _onChange?.({
        from: period.from,
        to: period.to,
      });
    }
  };

  const periodPlaceholder = useMemo(() => {
    const defaultPlaceholder = `YYYY-MM-DD${withTime ? ' HH:mm' : ''}`;
    if (isDate) {
      const _placeholder = placeholder as DateSelectboxProps<'date'>['placeholder'];
      return {
        from: _placeholder ?? defaultPlaceholder,
        to: '',
      };
    } else {
      const _placeholder = placeholder as DateSelectboxProps<'date-range'>['placeholder'];
      return {
        from: _placeholder?.from ?? defaultPlaceholder,
        to: _placeholder?.to ?? defaultPlaceholder,
      };
    }
  }, [withTime, isDate, placeholder]);

  const {
      openedState: [calendarOpened, setCalendarOpened],
      preventCloseProps,
    } = useOpenedStateWithCloseExternalClick(false),
    [calendarDisplay, setCalendarDisplay] = useDepsState(() => calendarOpened, [calendarOpened]);

  const [currentModal, setCurrentModal] = useState<keyof Period>('from'),
    currentModalDate = periodDate?.[currentModal] ?? undefined;

  const isConvertableDate = (value: string) => !isNaN(Date.parse(value));

  useMountedEffect(() => {
    if (calendarOpened) return;
    const selectedPeriodDate: Period = {
      from: undefined,
      to: undefined,
    };
    const { from, to } = periodString;
    if (valueSync) {
      setPeriodDate?.(generateToPeriodDate(value)());
      setPeriodString?.(generateToPeriodString(value)());
      if (isConvertableDate(from)) {
        selectedPeriodDate.from = new Date(from);
      }
      if (isConvertableDate(to)) {
        selectedPeriodDate.to = new Date(to);
      }
    } else {
      const selectedPeriodString = {
        from: '',
        to: '',
      };
      if (isConvertableDate(from)) {
        const fromDate = new Date(from);
        selectedPeriodString.from = formatDate(fromDate);
        selectedPeriodDate.from = fromDate;
      }
      if (isConvertableDate(to)) {
        const toDate = new Date(to);
        selectedPeriodString.to = formatDate(toDate);
        selectedPeriodDate.to = toDate;
      }
      setPeriodString?.(selectedPeriodString);
      setPeriodDate?.(selectedPeriodDate);
    }
    handleChange(selectedPeriodDate);
  }, [calendarOpened, formatDate]);

  const createInputChangeHandler =
    (type: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const selectedDate = periodDate?.[type];
      const previousYearMonth = selectedDate ? format(selectedDate, 'yyyy-MM') : '';

      setPeriodString?.({
        ...periodString,
        [type]: value,
      });

      if (isConvertableDate(value)) {
        const selectedDate = new Date(value);
        setPeriodDate?.({
          ...periodDate,
          [type]: selectedDate,
        });
        const currentYearMonth = format(selectedDate, 'yyyy-MM');
        if (previousYearMonth !== currentYearMonth) {
          setCalendarDisplay(false);
          setTimeout(() => setCalendarDisplay(true));
        }
      }
    };

  const setInputProps = (type: 'from' | 'to') => ({
    className: cleanClassName(
      `${scss.date_input} ${!!periodDate?.[type] && scss.filled} ${
        calendarOpened && currentModal === type && scss.opened
      }`
    ),
    onClick: () => {
      setCurrentModal(type);
      setCalendarOpened(true);
    },
    value: periodString[type],
    placeholder: periodPlaceholder[type],
    onChange: createInputChangeHandler(type),
    disabled: isDisabled,
  });

  return (
    <div className={scss.date_selectbox_container} id={id} style={{ width }}>
      <div
        className={`${isDate ? scss.date_selectbox : scss.date_range_selectbox} ${scss[theme]} ${
          isDisabled && scss.disabled
        } ${scss[modifier]} ${(!!periodDate?.from || !!periodDate?.to) && scss.filled} ${
          calendarOpened && scss.opened
        } ${invalid && scss.invalid}`}
        {...preventCloseProps}
      >
        <div className={scss.date_input_container}>
          <div className={scss.date_input_wrap}>
            <input {...setInputProps('from')} />
          </div>
          {!isDate && (
            <>
              {modifier === 'readonly' && <span className={scss.tilde}>~</span>}
              <div className={scss.date_input_wrap}>
                <input {...setInputProps('to')} />
              </div>
            </>
          )}
        </div>
        <button className={scss.icon_wrap} onClick={() => setCalendarOpened(!calendarOpened)}>
          <Calendar />
        </button>
      </div>
      {calendarDisplay && (
        <section
          className={`${scss.calendar_modal} ${scss[upDown]} ${scss[leftRight]}`}
          {...preventCloseProps}
        >
          <DayPicker
            locale={ko}
            mode="single"
            disabled={disabledDates}
            defaultMonth={currentModalDate ?? new Date()}
            selected={currentModalDate}
            className={scss.calendar_default}
            onSelect={(date: Date | undefined) => {
              setPeriodString?.({
                ...periodString,
                [currentModal]: formatDate(date),
              });
              const _period = { ...periodDate, [currentModal]: date };
              setPeriodDate?.(_period);
              handleChange(_period);
              setCalendarOpened(false);
            }}
            modifiersClassNames={{
              selected: scss.selected,
              today: scss.today,
            }}
          />
        </section>
      )}
    </div>
  );
}
