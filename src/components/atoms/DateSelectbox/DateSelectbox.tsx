import { Calendar } from 'react-feather';
import { format } from 'date-fns';
import { DayPicker, Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ko from 'date-fns/locale/ko';
import scss from './DateSelectbox.module.scss';
import { useOpenedStateWithCloseExternalClick, useDepsState, useParentState } from '../../../hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { cleanClassName } from '../../../utils';

export interface Period {
  from?: Date;
  to?: Date;
}

export type DateType = 'date' | 'date-range';
export interface DateSelectboxProps<T extends DateType> {
  type?: T;
  value?: T extends 'date' ? Period['from'] : Period;
  onChange?: T extends 'date' ? (value: Period['from']) => void : (value: Period) => void;
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
}

export function DateSelectbox<T extends DateType>({
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
  const _disabled = modifier === 'user' ? disabled : true;

  const [selectedPeriod, setSelectedPeriod] = useParentState<Period | undefined>(
    () => {
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
    [isDate, value],
    valueSync
  );

  const handlePeriodChange = useCallback(
    (period: Period) => {
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
      setSelectedPeriod?.(period);
    },
    [onChange, setSelectedPeriod, isDate]
  );

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

  const formatDate = useCallback(
    (date?: Date) => (date ? format(date, withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd') : ''),
    [withTime]
  );

  const [selectedPeriodString, setSelectedPeriodString] = useDepsState(() => {
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
  }, [value, formatDate, isDate]);

  const {
    openedState: [calendarOpened, setCalendarOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  const [currentModal, setCurrentModal] = useState<'from' | 'to'>('from'),
    currentModalDate = selectedPeriod?.[currentModal] ?? undefined;

  useEffect(() => {
    !calendarOpened &&
      setSelectedPeriodString({
        from: formatDate(selectedPeriod?.from),
        to: formatDate(selectedPeriod?.to),
      });
  }, [calendarOpened]);

  const handleInputChange = (type: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const selectedDate = selectedPeriod?.[type];
    const previousYearMonth = selectedDate ? format(selectedDate, 'yyyy-MM') : '';
    const refreshCalendar = (dateString: string) => {
      setCalendarOpened(false);
      setTimeout(() => {
        setSelectedPeriodString({
          ...selectedPeriodString,
          [type]: dateString,
        });
        setCalendarOpened(true);
      });
    };
    setSelectedPeriodString({
      ...selectedPeriodString,
      [type]: value,
    });
    if (value === '') handlePeriodChange({ ...selectedPeriod, [type]: undefined });
    else if (!isNaN(Date.parse(value))) {
      const selectedDate = new Date(value);
      handlePeriodChange({
        ...selectedPeriod,
        [type]: selectedDate,
      });
      const currentYearMonth = format(selectedDate, 'yyyy-MM');
      previousYearMonth !== currentYearMonth && refreshCalendar(value);
    }
  };

  const setInputProps = (type: 'from' | 'to') => ({
    className: cleanClassName(
      `${scss.date_input} ${!!selectedPeriod?.[type] && scss.filled} ${
        calendarOpened && currentModal === type && scss.opened
      }`
    ),
    onClick: () => {
      setCurrentModal(type);
      setCalendarOpened(true);
    },
    value: selectedPeriodString[type],
    placeholder: periodPlaceholder[type],
    onChange: handleInputChange(type),
    disabled: _disabled,
  });

  return (
    <div className={scss.date_selectbox_container} id={id} style={{ width }}>
      <div
        className={`${isDate ? scss.date_selectbox : scss.date_range_selectbox} ${scss[theme]} ${
          _disabled && scss.disabled
        } ${scss[modifier]} ${(!!selectedPeriod?.from || !!selectedPeriod?.to) && scss.filled} ${
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
      {calendarOpened && (
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
              handlePeriodChange({ ...selectedPeriod, [currentModal]: date });
              setSelectedPeriodString({
                ...selectedPeriodString,
                [currentModal]: formatDate(date),
              });
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