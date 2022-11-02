import { Link, setLink } from './Link';
import { usePathname, setUsePathname } from './usePathname';
export type { LinkProps } from './Link';
export { Link, usePathname };

interface Dependency {
  Link: (props: any) => JSX.Element;
  usePathname: () => string;
}

/**react 의존성 교체*/
export function replaceDependency({ Link, usePathname }: Dependency) {
  setLink(Link);
  setUsePathname(usePathname);
}
