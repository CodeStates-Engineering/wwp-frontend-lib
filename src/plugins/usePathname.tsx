import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';

export let usePathname = () => useLocation().pathname;
export function setUsePathnameToNext() {
  usePathname = () => useRouter().pathname;
}
