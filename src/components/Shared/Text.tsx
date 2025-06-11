import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface TextProps {
  color?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'error',
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span'
  bold?: boolean
  italic?: boolean
  center?: boolean
  margin?: number
  justify? : boolean
}

const Text: FC<PropsWithChildren<TextProps>> = (props) => {
  const { variant, children } = props;
  switch (variant) {
    case 'h1':
      return <H1 {...props}>{children}</H1>;
    default:
      return <P {...props}>{children}</P>;
  }
};

const H1 = styled.h1<TextProps>`
  font-weight: 100;
  text-align: center;
  word-break: break-word;
  hyphens: auto;
  color: ${p => p.theme.colors[p.color ?? 'default']};
  font-size: 3rem;
  margin: 65px 0;
`;

const getTextAlign = (style : TextProps) => {
  const { center, justify } = style;
  if (center === true) return 'center';
  if (justify === true) return 'justify';
  return 'left';
};

const P = styled.p<TextProps>`
  color: ${p => p.theme.colors[p.color ?? 'default']};
  text-align: ${p => getTextAlign(p)};
  font-size: 1rem;
  line-height: 1.5rem;
  hyphens: auto;

  ${p => (p.margin !== undefined ? `margin: ${p.margin}px` : '')};

  font-weight: ${p => (p.bold ? 'bold' : 300)};
  font-style: ${p => (p.italic ? 'italic' : 'normal')};
  letter-spacing: 0.1px;

  a {
    color: ${p => p.theme.colors[p.color ?? 'default']} !important;
    font-weight: bold;
  }
`;

export default Text;
