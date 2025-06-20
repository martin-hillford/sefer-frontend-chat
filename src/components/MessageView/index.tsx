import useChannelState from 'hooks/useChannelState';
import useChatContext from 'context/useChatContext';
import useMessages from 'hooks/useMessages';
import useScrollToRetrieve from 'hooks/useScrollToRetrieve';
import { useEffect, useRef, useState } from 'react';
import IncomingMessage from 'types/IncomingMessage';
import { getInputHeight } from 'util/getInputHeight';
import styled from 'styled-components';
import ViewMode from 'types/ViewMode';
import useViewContext from 'context/useViewContext';
import MessageDetails from './MessageDetails';
import Spinner from '../Shared/Spinner';
import isOnline from '../Shared/isOnline';
import BackBar from './BackBar';
import Loading from './Loading';
import MessageInput from './MessageInput';
import { Container, Messages } from './MessageView.styled';
import scrollToMessage from './scrollToMessage';
import ChannelTools from './ChannelTools';

export default (props : { searchTerm: string | undefined }) => {
  const ref = useRef<any>(null);
  const { searchTerm } = props;
  const { selectedChannel, targetMessageId, viewMode, onBackToChannelOverview, onShowChannelTool } = useViewContext();
  const state = useChannelState(selectedChannel?.id);
  const [quotedMessage, setQuotedMessage] = useState<IncomingMessage>();
  const [forceScroll, setForceScroll] = useState<'end' | 'target' | 'none'>('none');
  const [retrieving, setRetrieveMore] = useState(false);
  const { messages, retrieveAdditional, resetReceived, receivedMessageId, moreMessageAvailable } = useMessages(selectedChannel, targetMessageId);
  const { user, showChannelTools } = useChatContext();
  const retrieveMore = useScrollToRetrieve(ref, (messages?.length ?? 0) !== 0);

  // This effect will ensure that after channel swap, the last message will be displayed
  useEffect(() => {
    setForceScroll(targetMessageId ? 'target' : 'end');
  }, [selectedChannel, targetMessageId, viewMode]);

  // This effect wil ensure additional messages are retrieved.
  useEffect(() => {
    if (!retrieveMore || retrieving) return;
    setRetrieveMore(true);
    retrieveAdditional().then(() => { setRetrieveMore(false); });
  }, [retrieveMore]);

  // This effect will ensure that when a targetMessageId is set, the view will scroll to that message
  useEffect(() => {
    if (!ref?.current || !messages) return;

    if (forceScroll === 'end') ref.current.scroll({ top: ref.current.scrollHeight, behavior: 'instant' });
    if (forceScroll === 'target') scrollToMessage(ref, targetMessageId);
    if (forceScroll !== 'none') setForceScroll('none');
  }, [ref, forceScroll, messages, targetMessageId]);

  useEffect(() => {
    if (!ref?.current || !receivedMessageId) return;
    const childHeight = ref.current.lastElementChild?.scrollHeight ?? 0;
    const scrollDistance = ref.current.scrollHeight - ref.current.offsetHeight - childHeight - ref.current.scrollTop;
    if (scrollDistance < 20) scrollToMessage(ref, receivedMessageId);
    resetReceived();
  }, [receivedMessageId]);

  if (viewMode === ViewMode.Channel || !selectedChannel || !user) return null;
  if (!messages) return <Loading />;

  const details = [];
  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index];
    details.push(<MessageDetails
      searchTerm={searchTerm}
      onQuote={setQuotedMessage}
      message={message}
      key={message.id}
    />);
  }
  // When only messages are displayed add a back button
  const top = viewMode !== ViewMode.Both ? 60 : 0;
  const online = isOnline(selectedChannel, state, user);
  const inputHeight = getInputHeight(quotedMessage);
  const isMobile = viewMode === ViewMode.Messages;

  return (
    <Container style={{ position: 'relative' }}>
      <Tools className="tools">
        {!isMobile && showChannelTools && <ChannelTools channel={selectedChannel} onShowChannelTools={onShowChannelTool} />}
      </Tools>
      <BackBar
        onShowChannelTools={onShowChannelTool}
        online={online}
        show={isMobile}
        channel={selectedChannel}
        back={onBackToChannelOverview}
      />
      <Messages ref={ref} $inputHeight={inputHeight} $top={top} className="messages">
        {retrieving && moreMessageAvailable && <Spinner $center $color="primary" />}
        {details}
      </Messages>
      <MessageInput
        quoted={quotedMessage}
        height={inputHeight}
        stopQuoting={() => { setQuotedMessage(undefined); }}
        channel={selectedChannel}
        onMessageSend={() => setForceScroll('end')}
      />
    </Container>
  );
};

const Tools = styled.div`
  z-index: 10;
  top: 10px;
  position: absolute;
  right: 10px;
`;
