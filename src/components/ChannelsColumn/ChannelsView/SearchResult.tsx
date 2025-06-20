import styled from 'styled-components';
import { SearchResultData } from 'hooks//useSearch';
import Channel from 'types//Channel';
import ChannelDetails from './ChannelDetails';
import TextWithLinks from '../../Shared/TextWithLinks';

interface Props {
  results: SearchResultData[],
  channels : Channel[]
  onBrowseToMessage : (messageId : number, channel : Channel) => any
  targetMessageId : number | undefined
  searchTerm : string
}

export default (props : Props) => {
  const { results, targetMessageId, searchTerm, channels, onBrowseToMessage } = props;
  const lookup = createLookup(results);

  return (
    <>
      {channels.map(c => (
        <ChannelResults
          onBrowseToMessage={onBrowseToMessage}
          searchTerm={searchTerm}
          targetMessageId={targetMessageId}
          results={lookup[c.id]}
          key={c.id}
          channel={c}
        />
      ))}
    </>
  );
};

interface ChannelResultsProps {
    channel: Channel,
    results: SearchResultData[] | undefined,
    onBrowseToMessage : (messageId : number, channel : Channel) => any
    targetMessageId : number | undefined
    searchTerm : string
}

const ChannelResults = (props : ChannelResultsProps) => {
  const { channel, searchTerm, results, onBrowseToMessage, targetMessageId } = props;
  if (!results) return null;
  return (
    <>
      {results.map(r => (
        <ResultDetail
          onBrowseToMessage={onBrowseToMessage}
          key={r.messageId}
          channel={channel}
          result={r}
          selected={r.channelId === channel.id && r.messageId === targetMessageId}
          searchTerm={searchTerm}
        />
      ))}
    </>
  );
};

interface ResultDetailProps {
  channel: Channel,
  searchTerm : string,
  selected: boolean,
  result: SearchResultData,
  onBrowseToMessage : (messageId : number, channel : Channel) => any
}

const ResultDetail = (props : ResultDetailProps) => {
  const { channel, searchTerm, result, selected, onBrowseToMessage } = props;

  return (
    <Hover>
      <ChannelDetails hideOnline disabled channel={channel} selected={selected} onSelect={() => onBrowseToMessage(result.messageId, channel)} />
      <ContentPreview $selected={selected} onClick={() => onBrowseToMessage(result.messageId, channel)}>
        <TextWithLinks mark={searchTerm} text={result.content} />
      </ContentPreview>
    </Hover>
  );
};

const Hover = styled.div`
    color: ${p => p.theme.colors.default};
    cursor: pointer;
    &:hover {
        color: ${p => p.theme.colors.default} !important;
        background-color: ${p => p.theme.colors.defaultSupport} !important;
        border-radius: 12px;
    }
    padding-bottom: 8px;
`;

const ContentPreview = styled.div<{$selected:boolean}>`
    padding-left: 8px;
    padding-right: 8px;
    font-size: 0.875rem;
    line-height: 1rem;
    max-height: 3rem;
    overflow: hidden;
    color: ${p => (p.$selected ? p.theme.colors.primary : p.theme.colors.default)} !important;
`;

const createLookup = (results: SearchResultData[]) => {
  const lookup = {} as { [key: number]: SearchResultData[] };
  results.forEach(result => {
    if (!lookup[result.channelId]) lookup[result.channelId] = [];
    lookup[result.channelId].push(result);
  });
  return lookup;
};
