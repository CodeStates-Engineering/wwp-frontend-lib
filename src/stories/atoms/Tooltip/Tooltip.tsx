import scss from './Tooltip.module.scss';
import { AlertCircle } from 'react-feather';
import { cleanClassName } from '@utils';

export interface TooltipProps {
  children?: React.ReactNode;
  openDirection?: 'top' | 'bottom' | 'left' | 'right';
}
export function Tooltip({
  children,
  openDirection = 'top',
}: TooltipProps) {
  return (
    <div className={scss.announcement_message_container}>
      <AlertCircle />
      <div className={cleanClassName(
        `${scss.announcement_message} ${scss[openDirection]}`,
      )}>
        {children}
      </div>
    </div>
  );
}
