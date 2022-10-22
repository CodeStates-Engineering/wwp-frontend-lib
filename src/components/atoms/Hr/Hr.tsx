import { cleanClassName } from '../../../utils';
import scss from './Hr.module.scss';

export interface HrProps {
  type?: 'dotted' | 'solid' | 'dashed';
  color?: 'gray300';
  margin?: React.CSSProperties['width'];
}
export function Hr({ type, color, margin }: HrProps) {
  return (
    <hr
      style={{ margin }}
      className={cleanClassName(
        `${scss.hr} ${scss[`type-${type ?? 'solid'}`]} ${scss[`color-${color ?? 'gray300'}`]}`
      )}
    />
  );
}
