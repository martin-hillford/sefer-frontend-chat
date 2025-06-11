import { Dispatch, SetStateAction, useEffect } from 'react';
import Message from 'types/IncomingMessage';
import SendMessageResult from 'types/SendMessageResult';
import useChat from './useChat';

/** handles the onMessageSend event, which is fired when the server responds to sending a message */
export default (setMessages: Dispatch<SetStateAction<Message[] | null | undefined>>) => {
  const connector = useChat();

  useEffect(() => {
    if (!connector) return () => {};

    const listener = (event : SendMessageResult) => {
      setMessages(messages => updateState(messages, event));
    };

    // Subscribe and on destroy unsubscribe
    connector.onMessageSend.addListener(listener);
    return () => { connector.onMessageSend.removeListener(listener); };
  }, [connector, setMessages]);
};

const updateState = (messages: Message[] | null | undefined, event : SendMessageResult) => {
  const current = (messages ?? []);
  const message = current.find(m => m.tempId === event.tempId);
  if (!message) return current;

  const isSend = event.result === 'success';

  if (isSend) message.id = parseInt(event.messageId!);
  message.sendState = event.result;
  return [...current];
};