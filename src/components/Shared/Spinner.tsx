import styled, { keyframes } from 'styled-components';
import Center from './Center';

interface Style {
  $color: 'primary' | 'secondary' | 'tertiary' | 'default'
  $size?: 'small' | 'normal' | 'huge' | 'button'
  $paddingTop? : number
  $center?: boolean
}

const getSize = (size?: 'small' | 'normal' | 'huge' | 'button') => {
  switch (size) {
    case 'normal':
      return { $box: 40, $width: 4 };
    case 'huge':
      return { $box: 80, $width: 8 };
    case 'button':
      return { $box: 30, $width: 3 };
    default:
      return { $box: 20, $width: 2 };
  }
};

const Spinner = (props : Style) => {
  const { $size, $center } = props;
  if ($center) return <Center><Spinner {...props} $center={false} /></Center>;
  return (
    <Container {...props} {...getSize($size)}>
      <div />
      <div />
      <div />
      <div />

    </Container>
  );
};

const rings = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<Style & { $box: number, $width: number }>`
  display: inline-block;
  position: relative;
  width: ${p => p.$box}px;
  height: ${p => p.$box}px;
  padding-top: ${p => p.$paddingTop ?? 0}px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${p => p.$box - p.$width - p.$width}px;
    height: ${p => p.$box - p.$width - p.$width}px;
    margin: ${p => p.$width}px;
    border-width: ${p => p.$width}px;
    border-style: solid;
   border-radius: 50% !important;
    animation: ${rings} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${p => p.theme.colors[p.$color]} transparent transparent transparent;

    div:nth-child(1) {
      animation-delay: -0.45s;
    }

    div:nth-child(2) {
      animation-delay: -0.3s;
    }

    div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

export default Spinner;
