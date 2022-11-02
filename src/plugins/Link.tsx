import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import NextLink from 'next/link';
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
      return ({ to, ...restProps }: LinkProps) => <NextLink href={to} {...restProps} />;
    }
    default: {
      return (props: LinkProps) => <ReactLink {...props} />;
    }
  }
})();

export function Link(props: LinkProps) {
  return <LinkTag {...props} />;
}
