import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';
import { Link as ReactLink } from 'react-router-dom';
export interface LinkProps
  extends Pick<
    DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    'download' | 'target' | 'className' | 'children'
  > {
  to: string;
}

export let Link = (props: LinkProps) => <ReactLink {...props} />;

export function setLinkToNext() {
  const NextLink = require('next/link').default;
  Link = ({ to, ...restProps }: LinkProps) => <NextLink href={to} {...restProps} />;
}
