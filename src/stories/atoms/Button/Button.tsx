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
  | 'bluish-gray700'
  | 'wewin-peach500';

export type Variant = 'contain' | 'outline' | 'ghost';

export type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
  'onClick' | 'type' | 'children' | 'disabled' | 'name' | 'id'
> &
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'download'> & {
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
    refresh?: boolean;
    icon?: React.FunctionComponent<IconProps>;
  };

export function Button({
  to,
  variant = 'contain',
  shape = 'square',
  theme = 'wewin-blue600',
  size = 'medium',
  type = 'button',
  fontWeight = 'medium',
  fontSize = 'normal',
  delay,
  refresh = false,
  minWidth,
  icon: Icon,
  target,
  download,
  disabled,
  fitContainer,
  name,
  children,
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

  const commonProps = {
    ...restProps,
    className: cleanClassName(
      `${scss.button} ${scss['theme_' + variant + '-' + theme]}
    ${scss['size_' + size]}
    ${scss['shape_' + shape]} 
    ${scss['font_size_' + fontSize]}
    ${scss['font_weight_' + fontWeight]}
    ${isDelaying && scss.delay_button}
    ${fitContainer && scss.fit_container}`
    ),
    style: {
      minWidth,
    },
    children: (
      <div className={scss.button_contents}>
        {children}
        {Icon ? (
          <div className={scss.button_wrap}>
            <Icon />
          </div>
        ) : undefined}
      </div>
    ),
  };

  if (to && !disabled) {
    const linkProps = {
      ...commonProps,
      target,
      download,
    };
    return refresh ? <a {...linkProps} href={to} /> : <Link {...linkProps} to={to} />;
  } else {
    let buttonProps = {
      ...commonProps,
      disabled,
      name,
      type,
    };
    return isDelaying && delay ? (
      <button {...buttonProps} disabled>
        <div
          className={cleanClassName(`${scss.delaying_bar} ${startDelaying && scss.delaying}`)}
          style={{ transitionDuration: `${delay / 1000}s` }}
        />
        <div className={scss.delay_button_contents}>{buttonProps.children}</div>
      </button>
    ) : (
      <button {...buttonProps} />
    );
  }
}
