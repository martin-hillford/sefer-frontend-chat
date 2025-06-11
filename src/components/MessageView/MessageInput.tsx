import { usePost, uuid } from 'sefer-fetch';
import Button from 'components/Shared/Button';
import TextArea from 'components/Shared/TextArea';
import useChat from 'hooks/useChat';
import useChatContext from 'context/useChatContext';
import useIsConnected from 'hooks/useIsConnected';
import useIsMobile from 'hooks/useIsMobile';
import useLanguage from 'hooks/useLanguage';
import useMessageToString from 'hooks/useMessageToString';
import { Send } from 'icons';
import localization from 'localization';
import { KeyboardEvent, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Channel from 'types/Channel';
import IncomingMessage from 'types/IncomingMessage';
import { isEmpty } from 'util/isEmpty';
import QuotedMessage from './QuotedMessage';

const padding = 20;

interface Props {
  quoted: IncomingMessage | undefined | null
  height : number
  stopQuoting: () => any
  channel: Channel
  onMessageSend: () => any
}

export default (props : Props) => {
  const isMobile = useIsMobile();
  const theme = useTheme();
  const connector = useChat();
  const [response, setResponse] = useState<string>();
  const language = useLanguage();
  const { quoted, height, channel, stopQuoting, onMessageSend } = props;
  const { user } = useChatContext();
  const quotedMessage = useMessageToString(quoted);
  const post = usePost();
  const isConnected = useIsConnected();

  const label = isMobile ? null : localization[language].send;
  const icon = isMobile ? <Send color={theme.colors.defaultInverse} /> : null;

  const clear = () => { setResponse(undefined); stopQuoting(); };

  useEffect(clear, [channel]);

  const onSend = async () => {
    if (isEmpty(response) || !isConnected) return;

    const message = {
      content: response!,
      channelId: channel.id,
      tempId: uuid(),
      quotedMessageId: quoted?.id,
      quotedMessage,
      quotedUser: quoted?.senderName,
      senderId: user!.id,
      senderName: user!.name,
      receivers: [...channel.receivers]
    };

    if (connector?.isConnected) connector.sendMessage(message);
    else await post(`/user/channels/${channel.id}/messages`, message);

    // When the message is sent, clear input
    clear();

    // report to the parent that a message is sent.
    // Please note, the connector has will fire an event that the message is sent
    // no need to send that to the parent.
    onMessageSend();
  };

  const texAreaHeight = height - (quoted ? 40 : 0);

  const onKeyUp = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const enterPress = event.key === 'Enter' || event.code === 'Enter';
    if (!enterPress) return;

    const withSecondary = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    if (withSecondary) { event.preventDefault(); await onSend(); }
  };

  return (
    <Container height={height}>
      <QuotedMessage quotedMessage={quotedMessage} stopQuoting={stopQuoting} />
      <Border height={texAreaHeight}>
        <TextAreaContainer height={texAreaHeight}>
          <TextArea
            onChange={setResponse}
            value={response}
            onKeyUp={onKeyUp}

          />
        </TextAreaContainer>
        <ButtonGroup>
          <Button color={isConnected ? 'primary' : 'tertiary'} onClick={onSend} label={label} icon={icon} />
        </ButtonGroup>
      </Border>
    </Container>
  );
};

const Container = styled.div<{height : number}>`
  height:${p => p.height}px;
`;

const ButtonGroup = styled.div`
  flex: 0 0 auto;
  padding-left: 6px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
`;

const TextAreaContainer = styled.div<{height : number}>`
  flex : 1 1 auto;

  textarea {
    margin:0;
    height:${p => p.height - padding * 2}px;
  }
`;

const Border = styled.div<{height : number}>`
  height:${p => p.height}px;
  display: flex;
  flex-direction: row;
  padding:${padding}px;
`;
