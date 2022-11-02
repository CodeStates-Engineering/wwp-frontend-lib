import { useLocation } from 'react-router-dom';
export let usePathname = () => useLocation().pathname;
export function setUsePathnameToNext() {
  usePathname = () => {
    if (typeof window === 'undefined') return '';
    return window.location.pathname;
  };
}
