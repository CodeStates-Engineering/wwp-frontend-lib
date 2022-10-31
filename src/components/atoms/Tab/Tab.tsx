import scss from './Tab.module.scss';
import { cleanClassName } from '../../../utils';
import { Link, usePathname } from '../../../adaptor';

export interface TabProps {
  items: { label: React.ReactNode; to: string }[];
}
export function Tab({ items }: TabProps) {
  const currentPath = usePathname();
  return (
    <nav className={scss.tab}>
      <ul className={scss.tab_list}>
        {items.map(({ label, to }, index) => {
          const isActive = currentPath === to.split('?')[0];
          return (
            <li className={cleanClassName(isActive && scss.active)} key={`${label}_${index}`}>
              <Link to={to} isActive={isActive}>
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
