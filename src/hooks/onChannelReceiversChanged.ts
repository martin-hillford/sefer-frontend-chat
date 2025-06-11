import { useEffect, useState } from 'react';
import useChat from './useChat';
import { ChannelReceivers } from '../types/ChannelReceivers';

export const useOnChannelReceiversChanged = () => {
  const connector = useChat();
  const [value, setChannelReceivers] = useState<ChannelReceivers | undefined>(undefined);

  useEffect(() => {
    if (!connector) return () => {};

    connector.onChannelReceiversChanged.addListener(setChannelReceivers);
    return () => { connector.onChannelReceiversChanged.removeListener(setChannelReceivers); };
  }, [connector]);

  return value;
};
