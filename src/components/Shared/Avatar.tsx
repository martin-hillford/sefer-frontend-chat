import { useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';

interface Props {
  size? : number,
  avatarUrl: string
  color?: 'primary' | 'secondary' | 'tertiary'
  grayscale?: boolean
  onClick?: () => any
  isDataUrl? : boolean
}

export default (props : Props) => {
  const { avatarUrl, color = 'primary', size = 60, grayscale, onClick, isDataUrl = false } = props;
  const [error, setError] = useState(false);
  const theme = useTheme() as any;

  // Determine which color to use as fill-color
  const fillColor = grayscale ? 'tertiary' : color;
  const fill = theme.colors[fillColor]?.trim().replace('#', '%23');

  if (error || !avatarUrl) return <Shimmer $size={size} />;
  const url = isDataUrl ? avatarUrl : `${avatarUrl}&color=white&fill=${fill}`;

  const onImageClick = () => {
    if (onClick) onClick();
  };

  return (
    <Image
      onClick={onImageClick}
      onError={() => setError(true)}
      $grayscale={grayscale === true}
      height={size}
      width={size}
      src={url}
      alt=""
      $clickable={!!onClick}
    />
  );
};

const Image = styled.img<{$grayscale: boolean, $clickable : boolean}>`
    border-radius: 50%;
    ${p => (p.$grayscale ? 'filter: grayscale(110%);' : '')};
    ${p => (p.$clickable ? 'cursor: pointer;' : '')};
`;

const shimmering = keyframes`
  0% { background-position: -1300px 0; }
  100% { background-position: 1300px 0; }
`;

const Shimmer = styled.div<{$size: number}>`

  height: ${p => p.$size}px;
  width: ${p => p.$size}px;

  border-radius: 50%;
  border: 1px solid ${p => p.theme.colors.defaultSupport};

  animation: ${shimmering} 3.1s linear infinite;
  background: ${p => p.theme.colors.defaultSupport};
  background: linear-gradient(90deg, ${p => p.theme.colors.defaultSupport} 9%, ${p => p.theme.colors.defaultInverse} 18%, ${p => p.theme.colors.defaultSupport} 31%);
  background-size: 1300px 100%;
`;
