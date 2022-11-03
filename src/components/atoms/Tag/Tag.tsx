import scss from './Tag.module.scss';
import { cleanClassName } from '../../../utils';

export interface TagProps {
  children?: React.ReactNode;
  theme?:
    | 'wewin-blue600'
    | 'gray700'
    | 'wewin-gold700'
    | 'mint700'
    | 'gray200'
    | 'gray600'
    | 'peach500'
    | 'wewin-orange600'
    | 'green600';
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'tag' | 'button';
}
export function Tag({ theme = 'wewin-blue600', className, type = 'tag', ...tagProps }: TagProps) {
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
