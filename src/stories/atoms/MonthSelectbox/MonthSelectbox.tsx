import scss from './MonthSelectbox.module.scss';
import { Check, Calendar } from 'react-feather';
import { useOpenedStateWithCloseExternalClick, useParentState } from '@hooks';
import { cleanClassName } from '@utils';

export interface MonthDate {
  year?: number;
  month?: number;
}

export interface MonthSelectboxProps {
  value?: MonthDate;
  onChange?: (value: MonthDate) => void;
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  openDirection?: ['up' | 'down', 'left' | 'right'];
  name?: string;
  placeholder?: string;
  theme?: 'linear' | 'box';
  modifier?: 'system' | 'readonly' | 'user';
  width?: React.CSSProperties['width'];
}

const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const yearOptions: number[] = [];
for (let startYear = 1980; startYear < 2100; startYear++) yearOptions.push(startYear);

const scrollToSelectedValue = (targetYear?: number) => {
  const HIDDEN_ELEMENT_HEIGHT = 12;
  const currentYear = new Date().getFullYear();
  targetYear = targetYear ? targetYear : currentYear;

  const targetElement = document.getElementById(String(targetYear));
  setTimeout(() => {
    if (targetElement?.parentElement) {
      targetElement.parentElement.scrollTop = targetElement.offsetTop - HIDDEN_ELEMENT_HEIGHT;
    }
  });
};

export function MonthSelectbox({
  value,
  onChange,
  placeholder = 'YYYY-MM',
  disabled,
  id,
  invalid,
  name,
  openDirection: [upDown, leftRight] = ['down', 'left'],
  theme = 'box',
  modifier = 'user',
  width = '246px',
}: MonthSelectboxProps) {
  const {
    openedState: [optionsOpened, setOptionsOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);
  const [selectedValue, setSelectedValue] = useParentState(value),
    selectedYear = selectedValue?.year,
    selectedMonthNum = selectedValue?.month,
    selectedMonthString = selectedMonthNum !== undefined ? String(selectedMonthNum + 1) : undefined,
    selectedMonth = selectedMonthString
      ? selectedMonthString.length === 1
        ? '0' + selectedMonthString
        : selectedMonthString
      : undefined,
    isFilled = selectedYear || selectedMonth,
    _disabled = modifier === 'user' ? disabled : true;

  return (
    <div
      className={cleanClassName(
        `
        ${scss.month_selectbox_wrap}
        ${scss[theme]} ${modifier && scss[modifier]}`
      )}
      style={{ width }}
    >
      <button
        name={name}
        id={id}
        type="button"
        disabled={_disabled}
        className={cleanClassName(
          `${scss.month_selectbox} ${isFilled && scss.filled} 
          ${optionsOpened && scss.opened} 
          ${invalid && scss.invalid} 
          ${scss[theme]} ${modifier && scss[modifier]}`
        )}
        style={{ width }}
        onClick={() => {
          scrollToSelectedValue(selectedValue?.year);
          setOptionsOpened(!optionsOpened);
        }}
        {...preventCloseProps}
      >
        <div className={scss.selectbox_value}>
          {isFilled ? (
            <>
              {selectedYear}-{selectedMonth}
            </>
          ) : (
            placeholder
          )}
        </div>
        <Calendar />
      </button>
      <div
        className={cleanClassName(
          `${scss.options} ${!optionsOpened && scss.hidden} ${scss[upDown]} ${scss[leftRight]}`
        )}
        {...preventCloseProps}
      >
        <div className={scss.list_container}>
          <ul className={scss.list}>
            {yearOptions.map((yearOption) => {
              const isSelectedYear = yearOption === selectedYear;
              return (
                <li key={yearOption} id={String(yearOption)}>
                  <button
                    className={cleanClassName(
                      `${scss.item_button} ${scss.month} ${isSelectedYear && scss.selected}`
                    )}
                    onClick={() => {
                      const year = !isSelectedYear ? yearOption : undefined;
                      const _selectedValue = { ...selectedValue, year };
                      setSelectedValue?.(_selectedValue);
                      onChange?.(_selectedValue);
                      !isSelectedYear && selectedMonth && setOptionsOpened(false);
                    }}
                    type="button"
                  >
                    <Check className={scss.check} />
                    <div className={scss.text_wrap}>{yearOption}</div>
                  </button>
                </li>
              );
            })}
          </ul>
          <ul className={scss.list}>
            {monthOptions.map((monthOption) => {
              const isSelectedMonth = monthOption === selectedMonth;
              return (
                <li key={monthOption}>
                  <button
                    className={cleanClassName(
                      `${scss.item_button} ${scss.month} ${isSelectedMonth && scss.selected}`
                    )}
                    onClick={() => {
                      const month = !isSelectedMonth ? Number(monthOption) - 1 : undefined;
                      const _selectedValue = { ...selectedValue, month };

                      setSelectedValue?.(_selectedValue);
                      onChange?.(_selectedValue);
                      !isSelectedMonth && selectedYear && setOptionsOpened(false);
                    }}
                    type="button"
                  >
                    <Check className={scss.check} />
                    <div className={scss.text_wrap}>{monthOption}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
