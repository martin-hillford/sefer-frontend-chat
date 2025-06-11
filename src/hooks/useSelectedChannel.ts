import { useEffect, useState } from 'react';
import Channel from 'types/Channel';
import useIsMobile from './useIsMobile';

export default (channels : Channel[], initialChannelId : number | null | undefined) => {
  const [selectedChannel, setSelected] = useState<Channel>();
  const channelId = selectedChannel?.id ?? initialChannelId ?? -1;
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!channels || channels.length === 0) return;

    // On mobile screens there will no channel be initially selected.
    const selected = channels.find(c => c.id === channelId)
      ?? (!isMobile ? channels[0] : undefined);
    setSelected(selected);
  }, [channels, initialChannelId]);

  return { selectedChannel, setSelected };
};
