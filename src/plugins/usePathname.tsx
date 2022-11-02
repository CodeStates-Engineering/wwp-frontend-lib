import { useLocation } from 'react-router-dom';
import navigation from 'next/navigation';

export let usePathname = () => useLocation().pathname;
export function setUsePathnameToNext() {
  usePathname = navigation.usePathname;
}
