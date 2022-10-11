import scss from './Tooltip.module.scss';
import { cleanClassName } from '@utils';
import { ReactComponent as TooltipIcon } from '../../../assets/tooltip.svg';

export interface TooltipProps {
  children?: React.ReactNode;
  openDirection?: 'up' | 'down' | 'left' | 'right';
}
export function Tooltip({
  children,
  openDirection = 'up',
}: TooltipProps) {
  return (
    <div className={scss.announcement_message_container}>
      <TooltipIcon />
      <div className={cleanClassName(
        `${scss.announcement_message} ${scss[openDirection]}`,
      )}>
        {children}
      </div>
    </div>
  );
}
