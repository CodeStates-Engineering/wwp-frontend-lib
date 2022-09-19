import { useParentState } from "@hooks";
import { cleanClassName } from "@utils";
import scss from "./Radiobox.module.scss";

export interface RadioboxProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  options: string[];
}
export function Radiobox({
  options,
  id,
  value,
  onChange,
  className,
  invalid,
}: RadioboxProps) {
  const [selectedValue, setSelectedValue] = useParentState(value);

  return (
    <ul
      className={cleanClassName(
        `${scss.radiobox_list} ${invalid && scss.invalid} ${className}`
      )}
      id={id}
    >
      {options.map((option, index) => {
        return (
          <li key={index}>
            <label className={scss.radio_label}>
              <input
                type="radio"
                name={id}
                value={option}
                checked={selectedValue === option}
                onChange={() => {
                  setSelectedValue(option);
                  onChange?.(option);
                }}
              />
              <span>{option}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
