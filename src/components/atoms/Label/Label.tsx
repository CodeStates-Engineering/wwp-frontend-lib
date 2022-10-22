import { cleanClassName } from '../../../utils';
import scss from './Label.module.scss';
export interface LabelProps {
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
  essential?: boolean;
  id?: string;
  fontWeight?: 'light' | 'normal' | 'semi-bold' | 'bold';
  fontSize?: 'small' | 'medium' | 'large' | 'large2x' | 'large4x';
}
export function Label({
  essential,
  htmlFor,
  children,
  id,
  className,
  fontSize = 'small',
  fontWeight = 'bold',
}: LabelProps) {
  return (
    <label
      className={cleanClassName(
        `${scss.label} ${scss['font_size_' + fontSize]} ${
          scss['font_weight_' + fontWeight]
        } ${className}`
      )}
      htmlFor={htmlFor}
      id={id}
    >
      {children}
      {essential && <span className={scss.essential_mark}>*</span>}
    </label>
  );
}
