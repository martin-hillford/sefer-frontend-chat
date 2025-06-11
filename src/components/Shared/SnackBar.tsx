import { Close } from 'icons';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { useTheme } from 'styled-components';

interface Props {
    closable?: boolean,
    message: string
    type: 'success' | 'error'
    show: boolean,
    onClose: () => any;
}

export default (props : Props) => {
  const { closable, message, type, show, onClose } = props;
  const [transition, setTransition] = useState(show);
  const color = getColor(type);

  useEffect(() => {
    if (!show) return;
    setTimeout(() => { setTransition(true); }, 10);
    setTimeout(() => { setTransition(false); onClose(); }, 3500);
  }, [show]);

  return createPortal(
    <Container show={show} transition={transition}>
      <Message type={type}>
        <Center>
          {message}
        </Center>
        {closable !== false && <CloseButton onClick={() => setTransition(false)}><Close color={color} /></CloseButton> }
      </Message>
    </Container>,
    document.body
  );
};

const Container = styled.div<{show:boolean, transition: boolean}>`
    box-sizing: border-box;
    position: fixed;
    top: calc(${p => (p.transition ? 0 : -80)}px + env(safe-area-inset-top));
    display: ${p => (p.show ? 'flex' : 'none')};
    width: 100%;
    background-color: rgba(255,255,255, 0.1);
    z-index: 100;
    transition: top 500ms ease-in-out;
    justify-content: center;
`;

const Message = styled.div<{type: 'success' | 'error'}>`
    margin:10px;
    width: calc(100% - 20px);
    max-width: ${p => p.theme.screens.large - 40}px;
    background-color: ${p => getBackgroundColor(p.type)};
    color: ${p => getColor(p.type)};
    font-size: 1rem;
    border-radius: 6px;
    display: flex;
    padding:12px;

    div { flex: 1 1 auto }
`;

const CloseButton = styled.div`
    flex: 0 0 24px;
    svg { height: 16px; cursor: pointer; }
`;

const getBackgroundColor = (type: 'success' | 'error') => {
  const theme = useTheme();
  if (type === 'error') return theme.colors.error;
  return theme.colors.secondary;
};

const getColor = (type: 'success' | 'error') => {
  const theme = useTheme();
  if (type === 'error') return theme.colors.defaultInverse;
  return theme.colors.defaultInverse;
};

const Center = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
`;
