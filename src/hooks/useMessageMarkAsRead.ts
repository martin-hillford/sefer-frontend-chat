import { usePut } from 'sefer-fetch';
import { MutableRefObject, useEffect, useState } from 'react';
import IncomingMessage, { isReadByUser } from 'types/IncomingMessage';
import useChat from './useChat';
import useChatContext from '../context/useChatContext';
import useIntersection from './useIntersection';

function useMessageMarkAsRead<T extends Element>(message: IncomingMessage, channelId: number, envelop : MutableRefObject<T | null>) {
  const { user } = useChatContext();
  const markAsRead = useMarkAsReadConnector(message.id, channelId);
  const isVisible = useIntersection(envelop, '-10px', false);
  const [read, setRead] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // First some bookkeeping
    if (!user || read === true) return () => {};

    // Check (initially) if the message is read by the user
    if (read === undefined) { setRead(isReadByUser(message, user)); return () => {}; }

    // Only really do something if the message is not read and to send by this user
    const timeout = setTimeout(() => { markAsRead(); setRead(true); }, 5000);
    return () => { clearTimeout(timeout); };
  }, [message, isVisible, envelop, user, markAsRead]);

  return read;
}

const useMarkAsReadConnector = (messageId : number, channelId: number) => {
  const connector = useChat();
  const put = usePut();

  // this method will try to mark the message a read using the web socket
  const mark = () => {
    if (!connector || !connector.isConnected()) return false;
    try { connector?.markMessageAsRead(channelId, messageId); } catch { return false; }
    return true;
  };

  const markAsRead = () => {
    // first try to mark the message as read using the web socket
    const marked = mark();
    if (marked) return;

    // If that fails, fall back to the rest api
    // note: currently there is no need for handling the result of the mark action
    put(`/user/messages/${messageId}/mark-read`, {}).then();
  };

  return markAsRead ?? false;
};

export default useMessageMarkAsRead;
