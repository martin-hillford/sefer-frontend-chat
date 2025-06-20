import Avatar from 'components/Shared/Avatar';
import useChannelState from 'hooks/useChannelState';
import useChat from 'hooks/useChat';
import useChatContext from 'context/useChatContext';
import { UserGroup } from 'icons';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import BadgeEvent from 'types/BadgeEvent';
import Channel from 'types/Channel';
import Online from '../../Shared/Online';
import isOnline from '../../Shared/isOnline';
import { Container } from './Styled';
import Spacer from '../../Shared/Spacer';

interface Props {
  channel : Channel,
  selected : boolean,
  onSelect : (channel : Channel) => any
  disabled?: boolean
  hideOnline?: boolean
}

export default (props : Props) => {
  const { channel, selected, onSelect, hideOnline = false, disabled = false } = props;
  const { user } = useChatContext();
  const connector = useChat();
  const theme = useTheme();
  const [unreadCount, setUnreadCount] = useState(channel.unreadCount);
  const state = useChannelState(channel?.id);
  const online = isOnline(channel, state, user);
  const color = selected ? theme.colors.primary : theme.colors.tertiary;

  useEffect(() => {
    const listener = (event: BadgeEvent) => {
      if (channel.id === event.channelId) setUnreadCount(c => Math.max(c + event.count, 0));
    };
    connector?.onBadgeUpdate.addListener(listener);
    return () => { connector?.onBadgeUpdate.removeListener(listener); };
  }, []);

  const others = channel.receivers.filter(r => r.userId !== user?.id);
  const other = others.length === 1 ? others[0] : null;

  return (
    <Container $disabled={disabled} onClick={() => onSelect(channel)} $selected={selected}>
      <div>
        {!other && <Pos><UserGroup color={color} height={26} /></Pos>}
        {other && <Avatar grayscale={other.userActive === false} size={28} avatarUrl={other.userAvatarUrl} />}
      </div>
      <div>{channel.name}</div>
      <Online $show={online && !hideOnline} />
      <Spacer />
      <Badge $selected={selected} $show={unreadCount !== 0}>{unreadCount}</Badge>
    </Container>
  );
};

const Badge = styled.div<{$show : boolean, $selected : boolean}>`
  flex: 0 0 24px;
  background-color: ${p => (p.$selected ? p.theme.colors.primary : p.theme.colors.tertiary)};
  color: ${p => (p.$selected ? p.theme.colors.primaryInverse : p.theme.colors.tertiaryInverse)};
  border-radius: 50%;
  box-sizing: border-box;
  margin-top:2px;
  height: 24px;
  width: 24px;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  display: ${p => (p.$show ? 'flex' : 'none')};
  margin-right: 8px;
`;

const Pos = styled.div`
    svg { margin-left: -8px; }
`;
