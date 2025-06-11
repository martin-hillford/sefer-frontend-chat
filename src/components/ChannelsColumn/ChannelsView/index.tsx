import { useContext, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { UserRole } from 'types/User';
import { AddGroup } from 'icons';
import useLanguage from 'hooks/useLanguage';
import localization from 'localization';
import ChannelTool from 'types/ChannelTool';
import useViewContext from 'context/useViewContext';
import useSearch from 'hooks/useSearch';
import Channel from 'types/Channel';
import ChatContext from 'context/ChatContext';
import ChannelDetails from './ChannelDetails';
import Input from './Input';
import SearchResult from './SearchResult';
import Button from '../../Shared/Button';
import Props from '../Props';
import Toolbar from './Toolbar';

export default (props : Props) => {
  const { onBrowseToMessage } = props;
  const { selectedChannel, channels, onShowMessages, onShowChannelTool, targetMessageId, showBackToDashboard } = useViewContext();
  const [search, setSearch] = useState<string>('');
  const language = useLanguage();
  const searchResult = useSearch(search);
  const context = useContext(ChatContext);
  const theme = useTheme();

  const hasResults = searchResult && searchResult.length > 0;
  const isMentor = context.user.role === UserRole.Mentor;

  const onBrowse = (messageId : number, channel : Channel) => onBrowseToMessage(messageId, channel, search);

  // Nb. don't display the create group button it is not enabled in chat context
  return (
    <>
      <Toolbar showBackToApp={showBackToDashboard}>
        <Input value={search} onChange={setSearch} placeholder={localization[language].searchInMessages} />
        <Button
          hidden={!isMentor || context.showChannelTools !== true}
          onClick={() => onShowChannelTool(ChannelTool.CreateGroup)}
          icon={<AddGroup height={24} color={theme.colors.defaultInverse} />}
        />
      </Toolbar>
      <Container>
        {!hasResults && channels.map(c => <ChannelDetails key={c.id} channel={c} selected={c.id === selectedChannel?.id} onSelect={onShowMessages} />)}
        {hasResults && <SearchResult searchTerm={search} onBrowseToMessage={onBrowse} targetMessageId={targetMessageId} results={searchResult} channels={channels} />}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding:0 20px 20px;
`;
