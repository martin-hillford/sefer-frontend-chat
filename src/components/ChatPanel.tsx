import useInitialMessage from 'hooks/useInitialMessage';
import React, { useState } from 'react';
import styled from 'styled-components';
import Channel from 'types/Channel';
import ChannelsColumn from './ChannelsColumn';
import NoChannels from './NoChannels';
import Spinner from './Shared/Spinner';
import MessageView from './MessageView';
import { useFetchChannels } from '../hooks/useFetchChannels';
import useViewContextBuilder from '../context/useViewContextBuilder';
import ViewContext from '../context/ViewContext';
import { ViewContextObject } from '../context/ViewContextObject';
import ViewMode from '../types/ViewMode';

interface Props {
  initialChannelId : number | null | undefined
  initialMessageId : number | null | undefined
  showBackToDashboard?: boolean
}

export default (props : Props) => {
  const { initialChannelId, initialMessageId, showBackToDashboard } = props;
  const channelId = useInitialMessage(initialMessageId, initialChannelId);
  const { channels, onReloadChannels } = useFetchChannels();

  if (!channels || channelId === null) return <Spinner size="normal" color="primary" paddingTop={120} center />;
  if (channels.length === 0) return <NoChannels />;

  return (
    <Component
      showBackToDashboard={showBackToDashboard}
      channels={channels}
      initialMessageId={initialMessageId}
      initialChannelId={channelId}
      onReloadChannels={onReloadChannels}
    />
  );
};

const Component = (props : Props & { channels: Channel[], onReloadChannels : () => any }) => {
  const { initialChannelId, initialMessageId, channels, showBackToDashboard = true, onReloadChannels } = props;
  const viewContext = useViewContextBuilder(channels, initialChannelId, onReloadChannels);
  const { onShowMessages } = viewContext;
  const [targetMessageId, setTarget] = useState<number | undefined>(initialMessageId ?? undefined);
  const [search, setSearch] = useState<string | undefined>();

  const onBrowseToMessage = (messageId : number | undefined, channel : Channel, searchTerm: string | undefined) => {
    // Nb.the view mode and the left column mode are not directly related
    // to reduce complexity it easier to keep them separate
    onShowMessages(channel);
    setTarget(messageId);
    setSearch(searchTerm);
  };

  const context = { ...viewContext, onReloadChannels, targetMessageId, showBackToDashboard };
  return (
    <Content
      onBrowseToMessage={onBrowseToMessage}
      viewContext={context}
      searchTerm={search}
      showBackToDashboard={showBackToDashboard}
    />
  );
};

interface ContextProps {
  onBrowseToMessage : (messageId : number, channel : Channel, searchTerm: string | undefined) => any
  showBackToDashboard: boolean
  viewContext : ViewContextObject
  searchTerm: string | undefined
}

const Content = (props : ContextProps) => {
  const { viewContext, onBrowseToMessage, searchTerm, showBackToDashboard } = props;
  const { viewMode } = viewContext;

  // To reduce the rendering of components only display the view if required
  const displayMessages = viewMode !== ViewMode.Channel;
  const displayChannels = viewMode !== ViewMode.Messages;

  return (
    <ViewContext.Provider value={viewContext}>
      <Container>
        {displayChannels && <ChannelsColumn onBrowseToMessage={onBrowseToMessage} showBackToDashboard={showBackToDashboard} />}
        {displayMessages && <MessageView searchTerm={searchTerm} />}
      </Container>
    </ViewContext.Provider>
  );
};

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;
