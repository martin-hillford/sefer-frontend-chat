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
  const { variant, children, color, justify, italic, margin, center, bold } = props;
  const style = { $color: color, $justify: justify, $bold: bold, $italic: italic, $margin: margin, $center: center };
  switch (variant) {
    case 'h1':
      return <H1 {...style}>{children}</H1>;
    default:
      return <P {...style}>{children}</P>;
  }
};


interface StyleProps {
  $color?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'error',
  $bold?: boolean
  $italic?: boolean
  $center?: boolean
  $margin?: number
  $justify? : boolean
}

const H1 = styled.h1<StyleProps>`
  font-weight: 100;
  text-align: center;
  word-break: break-word;
  hyphens: auto;
  color: ${p => p.theme.colors[p.$color ?? 'default']};
  font-size: 3rem;
  margin: 65px 0;
`;

const getTextAlign = (style : StyleProps) => {
  const { $center, $justify } = style;
  if ($center === true) return 'center';
  if ($justify === true) return 'justify';
  return 'left';
};

const P = styled.p<StyleProps>`
  color: ${p => p.theme.colors[p.$color ?? 'default']};
  text-align: ${p => getTextAlign(p)};
  font-size: 1rem;
  line-height: 1.5rem;
  hyphens: auto;

  ${p => (p.$margin !== undefined ? `margin: ${p.$margin}px` : '')};

  font-weight: ${p => (p.$bold ? 'bold' : 300)};
  font-style: ${p => (p.$italic ? 'italic' : 'normal')};

  a {
    color: ${p => p.theme.colors[p.$color ?? 'default']} !important;
    font-weight: bold;
  }
`;

export default Text;
