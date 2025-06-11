import { CheckMark } from 'icons';
import styled, { useTheme } from 'styled-components';
import useChatContext from 'context/useChatContext';
import MessageDetailsProps from './Props';
import DateString from '../../Shared/DateString';

export default (props: MessageDetailsProps) => {
  const { message } = props;
  const { user } = useChatContext();
  const theme = useTheme();

  const isSender = message.isSender === true;
  if (!user || !isSender) return null;

  if (message.sendState === 'sending') return <Container><CheckMark color={theme.colors.tertiary} /></Container>;
  if (message.sendState === 'sending-error') return <Container><CheckMark color={theme.colors.error} /></Container>;

  const isReadByReceivers = (message.receivers?.filter(r => r.userId !== user.id && r.hasRead).length === message.receivers.length - 1);
  const color = isReadByReceivers ? theme.colors.secondary : theme.colors.tertiary;
  return (
    <Container>
      <DateReceived {...props} />
      <CheckMark color={color} />
      <CheckMark color={color} />
    </Container>
  );
};

const DateReceived = (props: MessageDetailsProps) => {
  const { message } = props;
  return <div className="message-date"><DateString value={message.senderDate} /></div>;
};

const Container = styled.div`
    padding-top: 16px;
    display: flex;
    font-size: 12px;
    svg {
        height: 18px;
        width: 18px;
        margin-right: -8px;
        margin-top: 1px;
    }
`;
