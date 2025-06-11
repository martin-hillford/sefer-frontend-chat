import { useEffect, useState } from 'react';
import ChannelState from 'types/ChannelState';
import ChannelStateInfo from 'types/ChannelStateInfo';
import useChat from './useChat';
import useChatContext from '../context/useChatContext';

export default (channelId : number | null | undefined) => {
  const [online, setOnline] = useState<{ userId: number }[]>([]);
  const { user } = useChatContext();
  const connector = useChat();

  useEffect(() => {
    if (!user || !connector) return () => {};

    // The listener process the incoming event to mark users as online or offline
    const listener = (event : ChannelStateInfo) => {
      if (event.channelId !== channelId || event.userId === user.id) return;

      if (event.state === 'offline') setOnline(online.filter(o => o.userId !== event.userId));
      else {
        const contains = online.find(o => o.userId === event.userId);
        if (!contains) setOnline([...online, event]);
      }
    };

    connector.onChannelStateChange.addListener(listener);
    return () => { connector.onChannelStateChange.removeListener(listener); };
  }, [connector, channelId, user]);

  return { channelId, online } as ChannelState;
};
