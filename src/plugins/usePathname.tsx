import { useLocation } from 'react-router-dom';
import Router from 'next/router';

export let usePathname = () => useLocation().pathname;
export function setUsePathnameToNext() {
  usePathname = () => Router.pathname;
}
