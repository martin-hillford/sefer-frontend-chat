import { Dispatch, SetStateAction, useEffect, } from 'react';
import Channel from 'types/Channel';
import IncomingMessage from 'types/IncomingMessage';
import useChat from './useChat';

/** handles the onMessageReceived event which is fired when the current user receives a message from another user in the current channel */
export default (channel: Channel | null | undefined, setReceivedMessageId : (messageId : number) => any, setMessages: Dispatch<SetStateAction<IncomingMessage[] | null | undefined>>) => {
  const connector = useChat();

  useEffect(() => {
    if (!connector) return () => {};

    const listener = (message : IncomingMessage) => {
      if (!channel || channel.id !== message.channelId) return;
      setMessages(messages => {
        if (message.tempId && messages?.find(m => m.tempId === message.tempId)) return messages;
        if (messages?.find(m => m.id === message.id)) return messages;
        return [message, ...messages ?? []];
      });
      setReceivedMessageId(message.id);
    };

    // Subscribe and on destroy unsubscribe
    connector.onMessageReceived.addListener(listener);
    return () => { connector.onMessageReceived.removeListener(listener); };
  }, [channel, setMessages, connector]);
};
