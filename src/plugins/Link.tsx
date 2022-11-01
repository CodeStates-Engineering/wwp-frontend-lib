import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

export interface LinkProps
  extends Pick<
    DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    'download' | 'target' | 'className' | 'children'
  > {
  to: string;
}

const LinkTag = (() => {
  switch (process.env.PRODUCT_TYPE) {
    case 'next': {
      const NextLink = require('next/link').default;
      return ({ to, ...restProps }: LinkProps) => <NextLink href={to} {...restProps} />;
    }
    case 'react': {
      const ReactLink = require('react-router-dom').Link;
      return (props: LinkProps) => <ReactLink {...props} />;
    }
    default: {
      return ({ to, ...restProps }: LinkProps) => <a href={to} {...restProps} />;
    }
  }
})();

export function Link(props: LinkProps) {
  return <LinkTag {...props} />;
}
