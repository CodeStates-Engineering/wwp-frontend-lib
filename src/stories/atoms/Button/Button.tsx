import scss from './Button.module.scss';
import { cleanClassName } from '@utils';
import { Link } from 'react-router-dom';
import { omit } from 'lodash-es';
import { useEffect, useState } from 'react';
import type { IconProps } from 'react-feather';

export type ButtonTheme =
  | 'wewin-blue100'
  | 'wewin-blue600'
  | 'bluish-gray50'
  | 'bluish-gray100'
  | 'bluish-gray200'
  | 'bluish-gray500'
  | 'bluish-gray600'
  | 'wewin-peach500';

export type Variant = 'contain' | 'outline' | 'ghost';

export interface ButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    'onClick' | 'type' | 'children' | 'disabled' | 'name' | 'id'
  > {
  variant?: Variant;
  theme?: ButtonTheme;
  shape?: 'round' | 'square';
  size?: 'small' | 'medium' | 'large';
  fontSize?: 'smallX' | 'small' | 'normal' | 'large' | 'large2X' | 'large4X';
  fontWeight?: 'regular' | 'medium' | 'bold';
  fitContainer?: boolean;
  minWidth?: string;
  to?: string;
  delay?: number;
  icon?: React.FunctionComponent<IconProps>;
}
export function Button({
  to,
  variant = 'contain',
  shape = 'square',
  theme = 'wewin-blue600',
  size = 'medium',
  type = 'button',
  delay,
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
        {restProps.children}
        {Icon ? (
          <div className={scss.button_wrap}>
            <Icon />
          </div>
        ) : undefined}
      </div>
    ),
    className: cleanClassName(
      `${scss.button} ${scss['theme_' + variant + '-' + theme]}
      ${scss['size_' + size]}
      ${scss['shape_' + shape]} 
      ${scss['font_size_' + restProps.fontSize]}
      ${scss['font_weight_' + restProps.fontWeight]}
      ${isDelaying && scss.delay_button}
      ${restProps.fitContainer && scss.fit_container}`
    ),
    style: {
      minWidth,
    },
  };

  if (isDelaying && delay) {
    return (
      <button {...buttonProps} disabled type={type}>
        <div
          className={cleanClassName(`${scss.delaying_bar} ${startDelaying && scss.delaying}`)}
          style={{ transitionDuration: `${delay / 1000}s` }}
        />
        <div className={scss.delay_button_contents}>{buttonProps.children}</div>
      </button>
    );
  }
  if (to) return <Link {...omit(buttonProps, ['disabled', 'name'])} to={to} />;
  return <button {...buttonProps} type={type} />;
}
