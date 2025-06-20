import styled from 'styled-components';
import ViewMode from 'types/ViewMode';
import ChannelTool from 'types/ChannelTool';
import { UserRole } from 'types/User';
import ChannelType from 'types/ChannelType';
import useChatContext from 'context/useChatContext';
import useViewContext from 'context/useViewContext';
import GroupInfo from './GroupInfo';
import Props from './Props';
import GroupChatDialog from './GroupChatDialog';
import ChannelsView from './ChannelsView';

export default (props : Props) => {
  const { viewMode } = useViewContext();
  const { maxWidthForChannelView = 400, } = useChatContext();

  return (
    <ChannelContainer $viewMode={viewMode} $maxChannelWidth={maxWidthForChannelView}>
      <Switch {...props} />
    </ChannelContainer>
  );
};

const Switch = (props: Props) => {
  const { channelTool, selectedChannel } = useViewContext();
  const { user, showChannelTools } = useChatContext();
  const isMentor = user.role === UserRole.Mentor;

  if (showChannelTools !== true) return <ChannelsView {...props} />;

  switch (channelTool) {
    case ChannelTool.ChannelView:
      return <ChannelsView {...props} />;
    case ChannelTool.CreateGroup:
      if (isMentor) return <GroupChatDialog />;
      break;
    case ChannelTool.ChannelInfo:
      if (isMentor && selectedChannel.type === ChannelType.Private) return <GroupChatDialog />;
      return <GroupInfo />;
    default:
      return null;
  }
  return null;
};

const ChannelContainer = styled.div<{$viewMode: ViewMode, $maxChannelWidth: number}>`
  display: ${p => (p.$viewMode !== ViewMode.Messages ? 'initial' : 'none')};
  width: ${p => (p.$viewMode === ViewMode.Channel ? '100%' : '100vw')};
  max-width: ${p => (p.$viewMode === ViewMode.Channel ? '100%' : `${p.$maxChannelWidth}px`)};
  min-width: 200px;
  overflow-y: auto;
  border-right: 1px solid ${p => p.theme.colors.defaultSupport};
  user-select: none;
`;
