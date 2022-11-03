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

export function setLink(LinkComponent: (props: any) => JSX.Element) {
  Link = ({ to, ...restProps }) => <LinkComponent {...restProps} href={to} />;
}
