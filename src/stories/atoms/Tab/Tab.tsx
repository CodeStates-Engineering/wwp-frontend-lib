import scss from "./Tab.module.scss";
import { cleanClassName } from "@utils";
import { Link, useLocation } from "react-router-dom";

export interface TabProps {
  items: { label: React.ReactNode; path: string }[];
}
export function Tab({ items }: TabProps) {
  const currentPath = useLocation().pathname;
  return (
    <nav className={scss.tab}>
      <ul className={scss.tab_list}>
        {items.map(({ label, path }) => {
          const isActive = currentPath === path;
          return (
            <li className={cleanClassName(isActive && scss.active)}>
              <Link
                to={path}
                className={cleanClassName(
                  `${scss.tab_link} ${isActive && scss.active}`
                )}
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
