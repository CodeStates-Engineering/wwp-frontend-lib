import { cleanClassName } from '@utils';
import scss from './Hr.module.scss';

export interface HrProps {
  className?: string;
  type?: 'dotted' | 'solid' | 'dashed';
  color?: 'gray300';
}
export function Hr(props: HrProps) {
  const { className, type, color } = props;
  return (
    <hr
      className={cleanClassName(
        `${scss.hr} ${scss[`type-${type ?? 'solid'}`]} ${
          scss[`color-${color ?? 'gray300'}`]
        } ${className}`
      )}
    />
  );
}
