import scss from './Tab.module.scss';
import { cleanClassName } from '../../../utils';
import { Link, useLocation } from 'react-router-dom';

export interface TabProps {
  items: { label: React.ReactNode; to: string }[];
}
export function Tab({ items }: TabProps) {
  const currentPath = useLocation().pathname;
  return (
    <nav className={scss.tab}>
      <ul className={scss.tab_list}>
        {items.map(({ label, to }) => {
          const isActive = currentPath === to.split('?')[0];
          return (
            <li className={cleanClassName(isActive && scss.active)}>
              <Link
                to={to}
                className={cleanClassName(`${scss.tab_link} ${isActive && scss.active}`)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={scss.line} />
    </nav>
  );
}
