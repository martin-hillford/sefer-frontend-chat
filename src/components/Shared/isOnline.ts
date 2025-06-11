import Channel from 'types/Channel';
import ChannelState from 'types/ChannelState';
import ChannelType from 'types/ChannelType';
import User from 'types/User';

export default (channel : Channel | undefined | null, state: ChannelState | null | undefined, user: User | undefined) => {
  if (!channel || !user || !state || state.channelId !== channel.id) return false;
  if (channel.type !== ChannelType.Personal) return false;
  return state.online.length > 0;
};