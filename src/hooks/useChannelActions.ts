import { useEffect } from 'react';
import useChat from './useChat';

export default (channelId : number | undefined | null) => {
  const connector = useChat();
  useEffect(() => {
    if (channelId) connector?.joinChannel(channelId);
    return () => { if (channelId) connector?.leaveChannel(channelId); };
  }, [channelId]);
};