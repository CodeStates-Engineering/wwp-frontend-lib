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

export let Link = (props: LinkProps) => <ReactLink {...props} />;
export function setLinkToNext() {
  Link = ({ to, ...restProps }: LinkProps) => <NextLink href={to} {...restProps} />;
}
