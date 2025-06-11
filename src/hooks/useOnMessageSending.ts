import { Dispatch, SetStateAction, useEffect } from 'react';
import IncomingMessage from 'types/IncomingMessage';
import MessageType from 'types/MessageType';
import OutgoingMessage from 'types/OutgoingMessage';
import useChat from './useChat';

/** handles the onMessageSending which is fired when the current user is sending a message to the server */
export default (setMessages: Dispatch<SetStateAction<IncomingMessage[] | null | undefined>>) => {
  const connector = useChat();

  useEffect(() => {
    if (!connector) return () => {};

    const listener = (outgoing : OutgoingMessage) => {
      setMessages(messages => {
        if (messages?.find(m => m.tempId === outgoing.tempId)) return messages;
        const message = convert(outgoing, messages?.length);
        return [{ ...message }, ...messages ?? []];
      });
    };

    // Subscribe and on destroy unsubscribe
    connector.onMessageSending.addListener(listener);
    return () => { connector.onMessageSending.removeListener(listener); };
  }, [connector, setMessages]);
};

const convert = (outgoing : OutgoingMessage, messages : number | undefined) => {
  const now = new Date(Date.now());
  return {
    ...outgoing,
    id: -1 * (messages ?? 1),
    senderDate: now.toUTCString(),
    isSender: true,
    type: MessageType.Text,
    isDeleted: false,
    receivers: outgoing.receivers.map(r => (
      { ...r,
        hasRead: r.userId === outgoing.senderId,
        readDate: r.userId === outgoing.senderId ? now : null
      })),
    sendState: 'sending'
  } as IncomingMessage;
};