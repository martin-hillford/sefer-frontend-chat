import { useEffect, useState } from 'react';
import Channel from '../types/Channel';
import useSelectedChannel from '../hooks/useSelectedChannel';
import ChannelTool from '../types/ChannelTool';
import useIsMobile from '../hooks/useIsMobile';
import ViewMode from '../types/ViewMode';
import { ViewContextObject } from './ViewContextObject';
import useChatContext from './useChatContext';
import { useOnChannelReceiversChanged } from '../hooks/onChannelReceiversChanged';

export default (channels : Channel[], initialChannelId : number | null | undefined, reloadChannels: () => any) => {
  const { user } = useChatContext();
  const [channelTool, setChannelTool] = useState<ChannelTool>(ChannelTool.ChannelView);
  const [mode, setMode] = useState<'channels' | 'messages'>('channels');
  const [initialSwitched, setInitialSwitched] = useState(false);
  const { selectedChannel, setSelected } = useSelectedChannel(channels, initialChannelId);
  const { onChannelChanged } = useChatContext();
  const isMobile = useIsMobile();
  const receivers = useOnChannelReceiversChanged(); // listen to incoming changes of the channels

  useEffect(() => {
    if (!initialChannelId) setMode('channels');
  }, [initialChannelId]);

  // This effect listen to incoming updates on a channel a user is part of
  // Primarily used for private channel.
  useEffect(() => {
    if (!receivers) return;
    // check if the membership of the user in the channel changed
    const leaveChannel = receivers.channelId === selectedChannel?.id && !receivers.receivers.includes(user.id);
    if (leaveChannel) setSelected(undefined);
    // Always reload the channels
    reloadChannels();
  }, [receivers, user]);

  // Determine if a switch should be made to the provided initial channel
  useEffect(() => {
    if (!selectedChannel || initialSwitched || !initialChannelId) return;
    setInitialSwitched(true);
    onShowMessages(selectedChannel);
  }, [initialChannelId, initialSwitched, selectedChannel]);

  const onShowMessages = (channel: Channel) => {
    // Since the user is moving to message overview
    // the channel needs to be added from the history stack
    if (onChannelChanged) onChannelChanged(channel.id);
    setSelected(channel);
    setMode('messages');
  };

  const onShowChannelTool = (tool: ChannelTool) => {
    setMode('channels');
    setChannelTool(tool);
  };

  const onBackToChannelOverview = () => {
    // Since the user is moving back to channel overview
    // the channel needs to be removed from the history stack
    if (onChannelChanged) onChannelChanged(undefined);
    setMode('channels');
    setChannelTool(ChannelTool.ChannelView);
  };

  const onCloseChannelTool = () => {
    // This make sense to move back to seeing the messages of the channel
    setMode('messages');
    setChannelTool(ChannelTool.ChannelView);
  };

  // The view mode will determine what part of the interface is in view
  // either the channels, the messages of a channel or on none mobile device both
  const viewMode = getViewMode(isMobile, mode);

  return {
    selectedChannel,
    viewMode,
    onShowMessages,
    onCloseChannelTool,
    onShowChannelTool,
    onBackToChannelOverview,
    channelTool,
    isMobile,
    channels
  } as ViewContextObject;
};

const getViewMode = (isMobile: boolean, mode: 'channels' | 'messages') => {
  if (!isMobile) return ViewMode.Both;
  return mode === 'channels' ? ViewMode.Channel : ViewMode.Messages;
};
