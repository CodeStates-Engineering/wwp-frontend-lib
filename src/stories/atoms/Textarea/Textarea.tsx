import { useParentState } from "@hooks";

import scss from "./Textarea.module.scss";
import { cleanClassName } from "@utils";

export interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  placeholder?: string;
  fitContainer?: boolean;
}

export function Textarea({
  className,
  id,
  name,
  placeholder,
  onChange,
  value = "",
  fitContainer,
  invalid,
}: TextareaProps) {
  const [inputValue, setInputValue] = useParentState(String(value));

  return (
    <textarea
      className={cleanClassName(
        `${scss.textarea} ${invalid && scss.invalid} ${
          fitContainer && scss.fit_container
        } ${className}`
      )}
      placeholder={placeholder}
      value={inputValue}
      name={name}
      id={id}
      onChange={(e) => {
        const { value } = e.target;
        setInputValue(value);
        onChange?.(value);
      }}
    />
  );
}
