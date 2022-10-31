export const usePathname = ((): (() => string) => {
  if (process.env.buildType !== 'storybook') {
    try {
      const { useRouter } = require('next/router');
      return () => useRouter().pathname;
    } catch (e) {
      try {
        const { useLocation } = require('react-router-dom');
        return () => useLocation().pathname;
      } catch (e) {
        return () => '';
      }
    }
  }
  return () => '';
})();
