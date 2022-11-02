import { useLocation } from 'react-router-dom';

export let usePathname = () => useLocation().pathname;
export function setUsePathnameToNext() {
  usePathname = require('next/navigation').usePathname;
}
