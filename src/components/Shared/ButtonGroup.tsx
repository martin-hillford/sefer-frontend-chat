import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    
    button { border-radius: 0 !important; }
    > :first-child {
        border-top-left-radius: 12px !important;
        border-bottom-left-radius: 12px !important;
    }
    > :last-child {
        border-top-right-radius: 12px !important;
        border-bottom-right-radius: 12px !important;
    }
`;
