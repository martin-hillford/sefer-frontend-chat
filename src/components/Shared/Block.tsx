import { ReactNode } from 'react';
import styled from 'styled-components';

export default (props : { children : ReactNode}) => {
  const { children } = props;
  return (
    <Container>
      <Box className="box">{children}</Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  padding-bottom: 75px;
  padding-top: 0;
  box-sizing: border-box;
  background: none;
  flex: 1 1 100%;
`;

const Box = styled.div`
  padding: 0 50px;
  box-sizing: border-box;
  flex: 1 1 100%;
  max-width: ${p => p.theme.maxWidth}px;
  @media (min-width: ${p => p.theme.screens.medium}px) {
    padding: 0;
  }
`;
