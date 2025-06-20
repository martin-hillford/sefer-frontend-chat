import styled from 'styled-components';
import { ReactNode } from 'react';
import useViewContext from 'context//useViewContext';
import ViewMode from 'types//ViewMode';
import BackToApp from './BackToApp';

export default (props : { children: ReactNode, showBackToApp : boolean }) => {
  const { viewMode } = useViewContext();
  const { children, showBackToApp } = props;
  return (
    <Tools>
      <BackToApp show={showBackToApp && viewMode === ViewMode.Channel} />
      <Div>{children}</Div>
    </Tools>
  );
};

const Tools = styled.div`
    position: sticky;
    top:  0;
    z-index: 10;
    padding-bottom: 10px;
    button {
        padding-left: 6px;
        margin: 8px 4px 4px;
    }
    svg { margin-left: 8px; margin-right: -4px; }
`;

const Div = styled.div`
    display: flex; padding: 0 20px;
`;
