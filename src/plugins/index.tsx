import { Link, setLink } from './Link';
import { usePathname, setUsePathname } from './usePathname';

interface Dependency {
  Link: Parameters<typeof setLink>[0];
  usePathname: Parameters<typeof setUsePathname>[0];
}

/**react 의존성 교체*/
export function replaceDependency({ Link, usePathname }: Dependency) {
  setLink(Link);
  setUsePathname(usePathname);
}

export { Link, usePathname };
