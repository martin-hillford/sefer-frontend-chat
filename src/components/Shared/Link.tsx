import useChatContext from 'context/useChatContext';
import React, { MouseEvent, ReactNode } from 'react';

interface Props {
  color?: string
  href: string
  target?: React.HTMLAttributeAnchorTarget | undefined
  className? : string
  children: ReactNode
}

export default (props: Props) => {
  const { className, href, color, children, target } = props;
  const { navigate } = useChatContext();
  const rel = target ? 'noreferrer' : undefined;
  const style = color ? { color } : {};

  const onLinkClick = (event : MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(href);
  };

  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <a onClick={onLinkClick} className={className} target={target} rel={rel} style={style} href="#">{children}</a>;
};
