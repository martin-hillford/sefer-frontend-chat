import { useGetAsync } from 'sefer-fetch';
import { useEffect, useReducer, useState } from 'react';
import Channel from '../types/Channel';

export const useFetchChannels = () => {
  const [value, onReloadChannels] = useReducer((x) => x + 1, 0);
  const [channels, setChannels] = useState<Channel[] | null | undefined>(undefined);
  const get = useGetAsync<Channel[]>();

  useEffect(() => {
    get('/user/channels').then(response => {
      if (!response.ok) setChannels(null);
      else setChannels(response?.body);
    });
  }, [value]);

  return { channels, onReloadChannels };
};
