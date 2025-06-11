import { Dispatch, SetStateAction, useEffect } from 'react';
import IncomingMessage from 'types/IncomingMessage';
import useChat from './useChat';

/** handles the onMessageDelivered event, which is fired when a message send is delivered to another user */
export default (setMessages: Dispatch<SetStateAction<IncomingMessage[] | null | undefined>>) => {
  const connector = useChat();

  useEffect(() => {
    if (!connector) return () => {};

    const listener = (event : IncomingMessage) => {
      setMessages(messages => updateState(messages, event));
    };

    // Subscribe and on destroy unsubscribe
    connector.onMessageDelivered.addListener(listener);
    return () => { connector.onMessageDelivered.removeListener(listener); };
  }, [connector, setMessages]);
};

const updateState = (messages: IncomingMessage[] | null | undefined, event : IncomingMessage) => {
  const current = (messages ?? []);
  let message = current.find(m => m.id === event.id);
  if (!message) message = current.find(m => m.tempId === event.tempId);

  // If the current message is not found, then it is a message send from another it is
  // a message send by the same user, but from another client
  if (!message) return [{ ...event, isSender: true }, ...current];
  message.sendState = event.sendState;
  return [...current];
};