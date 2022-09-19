import scss from './Tag.module.scss';
import { cleanClassName } from '@utils';
export interface TagProps {
  children?: React.ReactNode;
  theme?: 'blue' | 'gray' | 'gold' | 'mint' | 'black' | 'white' | 'peach';
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'tag' | 'button';
}
export function Tag({ theme = 'blue', className, type = 'tag', ...tagProps }: TagProps) {
  const classNames = cleanClassName(
    `${scss.tag} ${scss[type]} ${scss[`theme_${theme}`]} ${className}`
  );
  switch (type) {
    case 'tag':
      return <div {...tagProps} className={classNames} />;
    case 'button':
      return <button {...tagProps} className={classNames} />;
  }
}
