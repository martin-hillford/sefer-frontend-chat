import styled from 'styled-components';

export const Container = styled.div<{$selected : boolean, $disabled: boolean}>`
  height: 36px;
  word-wrap: unset;
  display: flex;
  color: ${p => (p.$selected ? p.theme.colors.primary : p.theme.colors.tertiary)};
  cursor: pointer;
  padding: 4px 0;
  box-sizing: border-box;
  margin: 6px 0;

  &:hover {
    ${p => (p.$disabled ? '' : `color: ${p.theme.colors.default}`)};
    ${p => (p.$disabled ? '' : `background-color: ${p.theme.colors.defaultSupport}`)};
    border-radius: 12px;
  }

  div:first-child {
    flex: 0 0 38px;
    padding: 0 6px;
  }

  div:nth-child(2) {
    flex: 0 0 auto;
    line-height: 28px;
  }
`;
