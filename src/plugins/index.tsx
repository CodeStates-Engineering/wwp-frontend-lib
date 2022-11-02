import { Link, setLinkToNext } from './Link';
export type { LinkProps } from './Link';
import { usePathname, setUsePathnameToNext } from './usePathname';

export { Link, usePathname };
/**react 용으로 개발된 컴포넌트들을 next 용으로 변경*/
export function setupForNext() {
  setLinkToNext();
  setUsePathnameToNext();
}
