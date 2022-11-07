import type { DetailedHTMLProps, AnchorHTMLAttributes } from 'react';

export interface LinkProps
  extends Pick<
    DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    'download' | 'target' | 'className' | 'children'
  > {
  to: string;
}

export let Link = (props: LinkProps) => <a {...props} href={props.to} />;

export function setLink(LinkComponent: (props: any) => JSX.Element | null) {
  Link = (props) => <LinkComponent {...props} href={props.to} />;
}
