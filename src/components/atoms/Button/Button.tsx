import scss from './Button.module.scss';
import { cleanClassName } from '../../../utils';
import { Link } from '../../../plugins';
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
  const [isDelaying, setIsDelaying] = useState(false);
  const [leftDelay, setLeftDelay] = useState(0);
  useEffect(() => {
    if (delay) {
      setLeftDelay(delay);
      setTimeout(() => {
        setIsDelaying(true);
        setTimeout(() => {
          setIsDelaying(false);
          setLeftDelay(0);
        }, delay);
      }, 500);
    }
  }, [setLeftDelay, setIsDelaying, delay]);

  const commonProps = {
    ...restProps,
    className: cleanClassName(`
      ${scss.button}
      ${scss['theme_' + variant + '-' + theme]}
      ${!!Icon && scss.include_icon}
      ${!!children && scss.include_text}
      ${scss['size_' + size]}
      ${scss['shape_' + shape]} 
      ${scss['font_size_' + fontSize]}
      ${scss['font_weight_' + fontWeight]}
      ${leftDelay && scss.delay_button}
      ${fitContainer && scss.fit_container}
      `),
    style: {
      minWidth,
    },
    children: (
      <div className={scss.button_contents}>
        {children ? <div> {children} </div> : undefined}
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

    if (refresh || target === '_blank') {
      return <a href={to} {...linkProps} />;
    }
    return <Link to={to} {...linkProps} />;
  } else {
    let buttonProps = {
      ...commonProps,
      disabled,
      name,
      type,
    };
    return leftDelay ? (
      <button {...buttonProps} disabled>
        <div
          className={cleanClassName(`${scss.delaying_bar} ${isDelaying && scss.delaying}`)}
          style={{ transition: `transform ${leftDelay / 1000}s linear` }}
        />
        <div className={scss.delay_button_contents}>{buttonProps.children}</div>
      </button>
    ) : (
      <button {...buttonProps} />
    );
  }
}
