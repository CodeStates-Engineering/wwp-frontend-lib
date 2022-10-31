import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

export interface LinkProps
  extends Pick<
    DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    'download' | 'target' | 'className' | 'children'
  > {
  to: string;
}

const LinkTag = (() => {
  if (process.env.buildType !== 'storybook') {
    try {
      const NextLink = require('next/link').default;
      return ({ to, ...restProps }: LinkProps) => <NextLink href={to} {...restProps} />;
    } catch (e) {
      try {
        const ReactLink = require('react-router-dom').Link;
        return (props: LinkProps) => <ReactLink {...props} />;
      } catch (e) {}
    }
  }
  return ({ to, ...restProps }: LinkProps) => <a href={to} {...restProps} />;
})();

export function Link(props: LinkProps) {
  return <LinkTag {...props} />;
}
