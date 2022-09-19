import scss from './SectionMoveButton.module.scss';
import { ChevronRight } from 'react-feather';
import { cleanClassName } from '@utils';

export interface SectionMoveButtonProps {
  title: string;
  subTitle?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}
export function SectionMoveButton(props: SectionMoveButtonProps) {
  const { title, subTitle, className, selected, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={cleanClassName(
        `${scss.section_move_button} ${selected && scss.selected} ${className}`
      )}
    >
      <p className={scss.step}>{subTitle}</p>
      <h3 className={scss.title}>
        {title}
        {<ChevronRight />}
      </h3>
    </button>
  );
}
