import { Dispatch, SetStateAction, useEffect } from 'react';
import Message, { Receiver } from 'types/IncomingMessage';
import MessagesRead from 'types/MessagesRead';
import useChat from './useChat';

/** handles the onMessageSend event, which is fired when the server responds to sending a message */
export default (setMessages: Dispatch<SetStateAction<Message[] | null | undefined>>) => {
  const connector = useChat();

  useEffect(() => {
    if (!connector) return () => {};

    const listener = (event : MessagesRead) => {
      setMessages(messages => updateMessages(messages, event));
    };

    // Subscribe and on destroy unsubscribe
    connector.onMessagesRead.addListener(listener);
    return () => { connector.onMessagesRead.removeListener(listener); };
  }, [connector, setMessages]);
};

const updateMessages = (messages: Message[] | null | undefined, event : MessagesRead) => {
  if (!messages) return messages;

  const contains = messages.find(m => m.id === event.messageId);
  if (!contains) return messages;
  contains.receivers = contains.receivers.map(receiver => updateReceivers(receiver, event));
  return [...messages];
};

const updateReceivers = (receiver : Receiver, event : MessagesRead) => {
  if (receiver.userId !== event.userId) return { ...receiver };
  const now = (new Date(Date.now())).toISOString();
  return { ...receiver, readDate: now, hasRead: true };
};