import useChat from 'hooks/useChat';
import useMessageMarkAsRead from 'hooks/useMessageMarkAsRead';
import useMessageToString from 'hooks/useMessageToString';
import { Copy, Reply, Send } from 'icons';
import { FC, PropsWithChildren, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { isEmpty } from 'util/isEmpty';
import useViewContext from 'context/useViewContext';
import ChannelType from 'types/ChannelType';
import MessageStatus from './MessageStatus';
import MessageDetailsProps from './Props';
import QuotedMessage from './QuotedMessage';

const Envelop : FC<PropsWithChildren<MessageDetailsProps>> = (props) => {
  const { children, message, onQuote } = props;
  const connector = useChat();
  const { selectedChannel } = useViewContext();
  const ref = useRef<HTMLDivElement>(null);
  const [quoteTime, setQuoteTimer] = useState<any>();
  const isSender = message.isSender === true;
  const text = useMessageToString(message);
  const [showTools, setShowTools] = useState(false);
  const theme = useTheme();
  const canQuote = !isEmpty(text);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const markAsRead = useMessageMarkAsRead(message, selectedChannel.id, ref);

  const quote = () => {
    if (canQuote) onQuote(message);
  };

  const resend = () => {
    if (!connector) return;
    connector.sendMessage({ ...message, tempId: message.tempId! });
  };

  const onMouseDown = (event: any) => {
    event.preventDefault();
    const timer = setTimeout(quote, 1500);
    setQuoteTimer(timer);
    return () => clearTimeout(timer);
  };

  const onMouseUp = () => {
    if (!quoteTime) return;
    clearTimeout(quoteTime);
    setQuoteTimer(undefined);
  };

  const onCopy = () => navigator.clipboard.writeText(text!);
  const canCopy = message.sendState === 'success';
  const canReply = message.sendState === 'success';
  const canResend = message.sendState === 'sending-error';

  return (
    <Placer
      onMouseEnter={() => setShowTools(true)}
      onMouseLeave={() => setShowTools(false)}
      data-id={message.id}
      ref={ref}
      $isSender={isSender}
    >
      <Container
        id={`message_${message.id}`}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onTouchEnd={() => onMouseUp()}
        onMouseUp={() => onMouseUp()}
        $isSender={isSender}
      >
        <Content $isSender={isSender}>
          <Sender $showName={selectedChannel.type === ChannelType.Private}>{message.senderName}</Sender>
          <QuotedMessage {...props} />
          {children}
          <MessageStatus {...props} markAsRead={markAsRead} />
        </Content>
      </Container>
      <Tools $show={showTools && canQuote}>
        {canCopy && <Copy onClick={onCopy} color={theme.colors.default} height={18} />}
        {canReply && <Reply onClick={quote} color={theme.colors.default} height={22} />}
        {canResend && <Send onClick={resend} color={theme.colors.default} height={22} />}
      </Tools>
    </Placer>
  );
};

const Content = styled.div<{$isSender: boolean}>`
  padding: 32px;
  hyphens: auto;
  word-wrap: break-word;
`;

const Placer = styled.div<{$isSender: boolean}>`
  width: 100%;
  display: flex;
  flex-direction: ${p => (p.$isSender ? 'row-reverse' : 'row')};
`;

const Tools = styled.div<{$show: boolean}>`
  visibility: ${p => (p.$show ? 'inherit' : 'hidden')};
  display: flex;
  align-items: flex-end;
  padding: 32px 12px;

  svg { cursor: pointer;}
`;

const Container = styled.div<{$isSender: boolean}>`
  background-color: ${p => (p.$isSender ? p.theme.colors.defaultSupport : p.theme.colors.defaultInverse)};
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.1px;
  text-decoration: none;
  color: ${p => p.theme.colors.default};
  width: fit-content;
  display: flex;
  flex-direction:  ${p => (p.$isSender ? 'row-reverse' : 'row')};
  
  border: 1px solid ${p => (p.$isSender ? p.theme.colors.defaultInverse : p.theme.colors.defaultSupport)};
  margin-top: 20px;
  border-radius: 12px;

  div.message-date {
    color: ${p => p.theme.colors.secondary};
    font-weight: bold;
  }

  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Sender = styled.div<{$showName: boolean}>`
  display: ${p => (p.$showName ? 'block' : 'none')};  
  font-size: 12px;
  font-weight: bold;
`;

export default Envelop;
