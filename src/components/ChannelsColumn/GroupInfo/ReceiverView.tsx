import Receiver from 'types//Receiver';
import { Container } from '../ChannelsView/Styled';
import Avatar from '../../Shared/Avatar';
import Spacer from '../../Shared/Spacer';

export default (props: { receiver : Receiver }) => {
  const { receiver } = props;
  return (
    <Container selected={false} disabled={false}>
      <div><Avatar grayscale={!receiver.userActive} size={28} avatarUrl={receiver.userAvatarUrl} /></div>
      <div>{receiver.userName}</div>
      <Spacer />
    </Container>
  );
};
