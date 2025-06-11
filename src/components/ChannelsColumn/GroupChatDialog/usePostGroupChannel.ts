import { usePost, usePut } from 'sefer-fetch';
import { useState } from 'react';
import GroupChannel from 'types/GroupChannel';
import Channel from 'types/Channel';
import { isEmpty } from 'util/isEmpty';

const validate = (channel: GroupChannel, channels: Channel[]) => {
  if (isEmpty(channel?.name) || channel?.name.length < 3) return { valid: false, msg: 'invalid-name' };
  const existing = channels.filter(c => c.name.toLowerCase().trim() === channel.name.toLowerCase().trim());
  if (existing.length === 0) return { valid: true, msg: undefined };
  if (existing.length > 1) return { valid: false, msg: 'name-existing' };
  if (existing[0].id === channel.id) return { valid: true, msg: undefined };
  return { valid: false, msg: 'name-existing' };
};

export default () => {
  const [state, setState] = useState<'none' | 'invalid' | 'pending' | 'success' | 'failed'>('none');
  const [error, setError] = useState<string | undefined>();
  const post = usePost();
  const put = usePut();

  const onSaveChannel = async (channel: GroupChannel, channels: Channel[]) => {
    const { valid, msg } = validate(channel, channels);
    setError(msg);

    if (!valid) return setState('invalid');
    setState('pending');

    const body = { name: channel.name, students: channel.students };
    const response = (channel.id > 0)
      ? await put(`/mentor/channels/${channel.id}`, body)
      : await post('/mentor/channels', body);

    if (response.ok) return setState('success');
    return setState('failed');
  };

  return { state, onSaveChannel, error };
};
