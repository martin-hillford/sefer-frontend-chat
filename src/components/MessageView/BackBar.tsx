import { Left } from 'icons';
import styled, { useTheme } from 'styled-components';
import Channel from 'types/Channel';
import ChannelTool from 'types/ChannelTool';
import useChatContext from 'context/useChatContext';
import Online from '../Shared/Online';
import ChannelTools from './ChannelTools';
import Spacer from '../Shared/Spacer';

interface Props {
    show: boolean,
    online: boolean,
    channel : Channel,
    back: () => any,
    onShowChannelTools: (tool: ChannelTool, channel: Channel) => any
}

export default (props: Props) => {
  const { show, channel, back, online, onShowChannelTools } = props;
  const { showChannelTools } = useChatContext();
  const theme = useTheme();

  if (!show) return null;
  return (
    <Bar>
      <Div onClick={back}><Left color={theme.colors.primary} /></Div>
      <Div onClick={back}>
        {channel.name}
        <Online show={online} />
      </Div>
      <Spacer />
      {showChannelTools && <ChannelTools onShowChannelTools={onShowChannelTools} channel={channel} />}
    </Bar>
  );
};

const Div = styled.div`
    color: ${p => p.theme.colors.primary};
    &:hover { 
        color: ${p => p.theme.colors.secondary};
        svg { color: ${p => p.theme.colors.secondary} !important; }
    }
    cursor: pointer;
`;

const Bar = styled.div`
  width: 100%;
  height: 60px;
  z-index:2;
  display: flex;
  padding-left: 20px;
  padding-top: 10px;
  border-bottom:  1px solid ${p => p.theme.colors.defaultSupport};
    
  div { line-height: 40px; padding-right: 8px; }
  svg { height: 24px; width: 24px; margin-top:8px; margin-bottom:8px; }
`;
