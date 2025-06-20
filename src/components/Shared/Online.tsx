import styled from 'styled-components';

export default styled.div<{$show:boolean}>`
  margin-top:10px;
  height: 10px;
  width: 10px;
  background-color: ${p => p.theme.colors.secondary};
  border-radius: 50%;
  display: ${p => (p.$show ? 'inline-block' : 'none')};
  margin-left: 6px;
  flex:0 0 auto;
`;
