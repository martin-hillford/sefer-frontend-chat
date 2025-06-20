import styled from 'styled-components';
import Spinner from '../../Shared/Spinner';

export default () => <Stretch><Spinner $center $size="normal" $color="primary" /></Stretch>;

const Stretch = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;
