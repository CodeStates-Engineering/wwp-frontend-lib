import scss from './Tab.module.scss';
import { cleanClassName } from '../../../utils';

export interface TabProps {
  items: { label: React.ReactNode; to: string }[];
}
export function Tab({ items }: TabProps) {
  const currentPath: string = (() => {
    try {
      const { useRouter } = require('next/router');
      return useRouter().pathname;
    } catch (e) {
      const { useLocation } = require('react-router-dom');
      return useLocation().pathname;
    }
  })();
  const Link = ({
    isActive,
    children,
    to,
  }: {
    isActive: boolean;
    children: React.ReactNode;
    to: string;
  }) => {
    const commonProps = {
      className: cleanClassName(`${scss.tab_link} ${isActive && scss.active}`),
      children,
    };
    try {
      const Link = require('next/link').default;
      return <Link {...commonProps} href={to}></Link>;
    } catch (e) {
      const { Link } = require('react-router-dom');
      return <Link {...commonProps} to={to} />;
    }
  };
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
