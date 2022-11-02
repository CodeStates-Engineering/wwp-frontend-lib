import { useLocation } from 'react-router-dom';
export let usePathname = () => useLocation().pathname;

export function setUsePathname(usePathnameHook: () => string) {
  usePathname = usePathnameHook;
}
