import { useParentState } from '../../../hooks';
import scss from './Textarea.module.scss';
import { cleanClassName } from '../../../utils';
import { useLayoutEffect, useRef } from 'react';

export interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  placeholder?: string;
  width?: React.CSSProperties['width'];
  theme?: 'linear' | 'box';
  modifier?: 'readonly' | 'user';
  maxHeight?: React.CSSProperties['maxHeight'] | 'auto';
  valueSync?: boolean;
}

export function Textarea({
  id,
  name,
  placeholder = '내용을 입력하세요.',
  onChange,
  value,
  width = '224px',
  invalid,
  theme = 'box',
  modifier = 'user',
  maxHeight,
  disabled,
  valueSync,
}: TextareaProps) {
  const [inputValue, setInputValue] = useParentState(() => value, [value], valueSync);
  const _disabled = modifier === 'user' ? disabled : true;
  const textarea = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (maxHeight && textarea.current) {
      const unit = (() => {
        if (Number(String(maxHeight).includes('rem'))) return 'rem';
        if (Number(String(maxHeight).includes('em'))) return 'em';
        return 'px';
      })();

      const maxHeightNumber = Number(String(maxHeight).split(unit)[0]);
      maxHeight =
        maxHeight === 'auto'
          ? Infinity
          : {
              px: maxHeightNumber,
              em: maxHeightNumber * 14, // font-size: 14px
              rem: maxHeightNumber * 16,
            }[unit];

      if (textarea.current.scrollHeight <= maxHeight) {
        textarea.current.style.overflowY = 'scroll';
        textarea.current.style.height = '0px';
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
      }

      if (textarea.current.scrollHeight > maxHeight) {
        textarea.current.style.height = `${maxHeight}px`;
      }
    }
  }, [maxHeight, inputValue]);

  return (
    <textarea
      ref={textarea}
      className={cleanClassName(
        `${scss.textarea}
        ${scss[theme]} ${modifier && scss[modifier]}
        ${invalid && scss.invalid}
        ${inputValue && scss.filled}
       `
      )}
      style={{ width }}
      placeholder={placeholder}
      value={inputValue}
      name={name}
      id={id}
      disabled={_disabled}
      onChange={(e) => {
        const { value } = e.target;
        setInputValue?.(value);
        onChange?.(value);
      }}
    />
  );
}
