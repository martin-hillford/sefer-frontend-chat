import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Messages = styled.div<{$inputHeight : number, $top: number }>`
    box-sizing: border-box;
    overflow-y: auto;
    height: calc(100% - ${p => p.$top}px - ${p => p.$inputHeight}px);
    border-top: 1px solid ${p => p.theme.colors.defaultInverse};
    border-bottom: 1px solid ${p => p.theme.colors.defaultSupport};
    padding: 20px;
`;
