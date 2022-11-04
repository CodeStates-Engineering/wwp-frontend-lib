export let usePathname = () => window.location.pathname;
export function setUsePathname(usePathnameHook: () => string) {
  usePathname = usePathnameHook;
}
