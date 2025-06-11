import { useGetAsync } from 'sefer-fetch';
import { useEffect, useState } from 'react';

const getInitial = (messageId : number | null | undefined, initialChannelId : number | null | undefined) => {
  if (initialChannelId) return initialChannelId;
  if (messageId) return null;
  return undefined;
};

export default (messageId : number | null | undefined, initialChannelId : number | null | undefined) => {
  const [channelId, setChannelId] = useState(getInitial(messageId, initialChannelId));
  const get = useGetAsync<any>();

  useEffect(() => {
    if (initialChannelId || !messageId) return;
    get(`/user/messages/${messageId}/channel`)
      .then(response => setChannelId(response?.body?.id ?? undefined));
  }, [initialChannelId, messageId]);

  return channelId;
};
