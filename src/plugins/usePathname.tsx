export const usePathname = ((): (() => string) => {
  switch (process.env.PRODUCT_TYPE) {
    case 'next': {
      const { useRouter } = require('next/router');
      return () => useRouter().pathname;
    }
    case 'react': {
      const { useLocation } = require('react-router-dom');
      return () => useLocation().pathname;
    }
    default: {
      return () => window.location.pathname;
    }
  }
})();
