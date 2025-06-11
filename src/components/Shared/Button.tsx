import useChatContext from 'context/useChatContext';
import { ReactElement } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: Function,
  href?: string,
  color?: 'primary' | 'secondary' | 'tertiary' | 'error'
  label?: string | null,
  icon?: ReactElement | null,
  hidden?: boolean
  disabled?: boolean
}

export default (props : ButtonProps) => {
  const { href, label, disabled = false, color = 'primary', onClick, icon, hidden } = props;
  const { navigate } = useChatContext();

  const onButtonClick = () => {
    if (onClick) onClick();
    else if (href) navigate(href);
  };

  if (hidden === true) return null;

  return (
    <ButtonBase
      onClick={() => onButtonClick()}
      disabled={disabled}
      color={color}
      type="button"
    >
      <Content>{label}{icon}</Content>
    </ButtonBase>
  );
};

const Content = styled.div`
  height: 40px !important;
  line-height: 40px !important;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;

  svg {
    height: 22px;
    width: 22px;
    display: block;
  }
`;

const ButtonBase = styled.button<{ disabled: boolean, color: 'primary' | 'secondary' | 'tertiary' | 'error' }>`

  background-color: ${p => p.theme.colors[p.color]};
  color: ${p => p.theme.colors[`${p.color}Inverse`]};
  height: 40px;
  padding: 0 20px;
  border: 0;
  border-radius: 12px;
  font-size: 1rem !important;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none !important;
  font-weight: 400 !important;
  filter: brightness(${p => (p.disabled ? 60 : 100)}%);
  
  &:hover { box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.1); }
  &:focus-visible { outline:none; }
`;
