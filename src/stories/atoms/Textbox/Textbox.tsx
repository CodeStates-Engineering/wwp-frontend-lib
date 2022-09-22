import scss from './Textbox.module.scss';
import { useParentState } from '@hooks';
import { cleanClassName } from '@utils';
import { regex } from '@utils';
import { Percent } from 'react-feather';

export interface TextboxProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: string;
  name?: string;
  unit?: React.ReactNode;
  type?: 'number' | 'text' | 'comma-separated-number';
  theme?: 'linear' | 'box';
  modifier?: 'system' | 'readonly' | 'user';
}

export function Textbox({
  disabled,
  placeholder,
  unit,
  id,
  type,
  onChange,
  name,
  value = '',
  invalid,
  theme = 'box',
  modifier = 'user',
}: TextboxProps) {
  const [inputValue, setInputValue] = useParentState(value);
  disabled = modifier === 'user' ? disabled : true;

  const isFilled = inputValue !== '';

  const conditionalProps = (() => {
    const createChangeEventHandler =
      (changeEventHandler: (value: string) => void) =>
        (event: React.ChangeEvent<HTMLInputElement>) =>
          changeEventHandler(event.target.value);

    const handleCommonEvent = (value: string) => {
      setInputValue(value);
      onChange?.(value);
    };

    switch (type) {
      case 'number':
        return {
          placeholder: placeholder ?? '00',
          value: inputValue,
          onChange: createChangeEventHandler((value) =>
            handleCommonEvent(value),
          ),
        };

      case 'comma-separated-number':
        return {
          placeholder: placeholder ?? '000,000,000',
          value: inputValue.replace(regex.addCommasToNumber, ','),
          onChange: createChangeEventHandler((value) =>
            handleCommonEvent(value.replace(regex.number, '')),
          ),
        };

      default:
        return {
          placeholder: placeholder ?? '내용을 입력하세요.',
          value: inputValue,
          onChange: createChangeEventHandler((value) =>
            handleCommonEvent(value),
          ),
        };
    }
  })();

  const Unit = () => {
    if (!unit) return <></>;
    let generatedUnit = unit;
    switch (unit) {
      case '%':
        generatedUnit = <Percent />;
    }
    return <div className={scss.unit_wrap}>{generatedUnit}</div>;
  };

  return (
    <div
      className={cleanClassName(
        `${scss.input_container} 
        ${scss[theme]} 
        ${modifier && scss[modifier]}
        ${invalid && scss.invalid} 
        ${disabled && scss.disabled} 
        ${isFilled && scss.filled}`,
      )}
    >
      <input
        type={type}
        {...conditionalProps}
        disabled={disabled}
        id={id}
        name={name}
      />
      <Unit />
    </div>
  );
}
