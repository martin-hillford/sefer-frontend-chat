import styled from 'styled-components';
import useLanguage from 'hooks//useLanguage';
import useViewContext from 'context//useViewContext';
import localization from 'localization';
import Button from '../../Shared/Button';
import Separator from '../ChannelsView/Separator';
import ButtonGroup from '../../Shared/ButtonGroup';
import Toolbar from '../ChannelsView/Toolbar';
import ReceiverView from './ReceiverView';

export default () => {
  const { selectedChannel, onCloseChannelTool, channels } = useViewContext();
  const language = useLanguage();

  const channel = channels.find(c => c.id === selectedChannel?.id);
  const receivers = channel?.receivers ?? [];
  const terms = localization[language];

  return (
    <>
      <Toolbar showBackToApp={false}>
        <Bar>
          <Div>{terms.channel} {channel?.name}</Div>
        </Bar>
      </Toolbar>
      <Container>
        {receivers.map(r => <ReceiverView receiver={r} key={r.userId} />) }
        <Separator $show />
        <Close>
          <ButtonGroup>
            <Button color="primary" onClick={onCloseChannelTool} label={terms.close} />
          </ButtonGroup>
        </Close>
      </Container>
    </>
  );
};

const Close = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-top: 10px;
`;

const Div = styled.div`
    color: ${p => p.theme.colors.primary};
    &:hover {
        color: ${p => p.theme.colors.secondary};
        svg { color: ${p => p.theme.colors.secondary} !important; }
    }
    cursor: pointer;
`;

const Bar = styled.div`
  width: calc(100% + 40px);
  height: 60px;
  z-index:2;
  display: flex;
  padding-left: 26px;
  border-bottom:  1px solid ${p => p.theme.colors.defaultSupport};
    margin-left: -20px;
    margin-right: -20px;
    padding-top: 10px;
    padding-bottom: 10px;

  div { line-height: 40px; padding-right: 8px; }
  svg { height: 24px; width: 24px; margin-top:8px; margin-bottom:8px; }
`;

const Container = styled.div`
  padding:0 20px 20px;
`;
