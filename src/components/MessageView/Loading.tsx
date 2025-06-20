import Center from '../Shared/Center';
import Spinner from '../Shared/Spinner';
import { Container } from './MessageView.styled';

export default () => (
  <Container>
    <Center>
      <Spinner $paddingTop={60} $color="primary" $size="normal" $center />
    </Center>
  </Container>
);
