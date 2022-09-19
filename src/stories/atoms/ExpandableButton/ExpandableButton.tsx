import type React from 'react';
import type { IconProps } from 'react-feather';

import scss from './ExpandableButton.module.scss';
import { cleanClassName } from '@utils';
import { useState } from 'react';

//확장형 버튼 관련 컴포넌트
export interface ExpandableButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  onClick?: () => void;
  icon: React.FunctionComponent<IconProps>;
  disabled?: boolean;
}
export function ExpandableButton({
  className,
  type = 'button',
  children,
  onClick,
  icon: Icon,
  disabled
}: ExpandableButtonProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      disabled={disabled}
      type={!isActive ? 'button' : type}
      className={cleanClassName(`
      ${scss.expandable_button}
      ${isActive && scss.active}
      ${className}
      `)}
      onClick={() => {
        isActive && onClick?.();
        setIsActive(!isActive);
      }}
      onMouseLeave={() => setIsActive(false)}
    >
      <Icon />
      <span
        className={cleanClassName(`
      ${scss.expandable_button_text}
      ${isActive && scss.active}
      `)}
      >
        {children}
      </span>
    </button>
  );
}
