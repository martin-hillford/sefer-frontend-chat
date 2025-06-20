import styled from 'styled-components';

export default styled.div<{$show:boolean}>`
    border-bottom: 1px solid ${p => p.theme.colors.tertiary};
    padding-bottom: 10px;
    margin-bottom: 10px;
    display: ${p => (p.$show ? 'block' : 'none')};
`;
