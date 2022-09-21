import scss from './Button.module.scss';
import { cleanClassName } from '@utils';
import { Link } from 'react-router-dom';
import { omit } from 'lodash-es';
import { useEffect, useState } from 'react';
import type { IconProps } from 'react-feather';

type ButtonTheme =
  | 'fill-wewin-blue100'
  | 'fill-wewin-blue600'
  | 'fill-bluish-gray50'
  | 'fill-bluish-gray100'
  | 'fill-bluish-gray200'
  | 'fill-bluish-gray500'
  | 'fill-wewin-peach500'
  | 'outline-wewin-blue600'
  | 'outline-bluish-gray600'
  | 'outline-wewin-peach500'
  | 'text-wewin-blue600'
  | 'text-bluish-gray600'
  | 'text-wewin-peach500';

export interface ButtonProps
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    'onClick' | 'type' | 'children' | 'disabled' | 'name' | 'id'> {
  theme?: ButtonTheme;
  shape?: 'round' | 'square';
  size?: 'small' | 'medium' | 'large';
  fontSize?: 'smallX' | 'small' | 'medium' | 'large' | 'large2X' | 'large4X';
  fontWeight?: 'normal' | 'bold' | 'boldest';
  fitContainer?: boolean;
  minWidth?: string;
  to?: string;
  delay?: number;
  icon?: React.FunctionComponent<IconProps>;
}
export function Button({
  to,
  theme = 'fill-wewin-blue600',
  shape = 'square',
  size = 'medium',
  type = 'button',
  delay=3000,
  minWidth,
  icon: Icon,
  ...restProps
}: ButtonProps) {
  const [isDelaying, setIsDelaying] = useState(!!delay);
  const [startDelaying, setStartDelaying] = useState(false);
  useEffect(() => {
    if (delay) {
      setTimeout(() => setStartDelaying(true), 1000);
      setTimeout(() => setIsDelaying(false), 1000 + delay);
    }
  }, [setStartDelaying, setIsDelaying, delay]);

  const buttonProps = {
    ...restProps,
    disabled: restProps.disabled || isDelaying,
    children: (
      <div className={scss.button_contents}>
        {Icon ? (
          <div className={scss.button_wrap}>
            <Icon />
          </div>
        ) : undefined}
        {restProps.children}
      </div>
    ),
    className: cleanClassName(
      `${scss.button} ${scss['theme_' + theme]}
      ${scss['size_' + size]}
      ${scss['shape_' + shape]} 
      ${scss['font_size_' + restProps.fontSize]}
      ${scss['font_weight_' + restProps.fontWeight]}
      ${isDelaying && scss.delay_button}
      ${restProps.fitContainer && scss.fit_container}`,
    ),
    style: {
      minWidth,
    },
  };

  if (isDelaying && delay) {
    return (
      <button {...buttonProps} disabled type={type}>
        <div
          className={cleanClassName(
            `${scss.delaying_bar} ${startDelaying && scss.delaying}`,
          )}
          style={{ transitionDuration: `${delay / 1000}s` }}
        />
        <div className={scss.delay_button_contents}>{buttonProps.children}</div>
      </button>
    );
  }
  if (to) return <Link {...omit(buttonProps, ['disabled', 'name'])} to={to} />;
  return <button {...buttonProps} type={type} />;
}
