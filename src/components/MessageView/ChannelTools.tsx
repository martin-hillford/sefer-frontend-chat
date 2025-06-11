import styled from 'styled-components';
import Channel from 'types/Channel';
import ChannelTool from 'types/ChannelTool';

export default (props: { channel : Channel, onShowChannelTools: (mode: ChannelTool, channel: Channel) => any }) => {
  const { channel, onShowChannelTools } = props;
  const onClick = () => onShowChannelTools(ChannelTool.ChannelInfo, channel);
  return <Container onClick={onClick}><Info><span>i</span></Info></Container>;
};

const Container = styled.div`
    line-height: 40px;
    padding-top: 7px;
    cursor: pointer;
`;

const Info = styled.div`
    border-radius: 50%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    text-align: center;
    height: 26px;
    width: 26px;
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.primaryInverse};
    font-family: Georgia;
    font-size: 18px;
    font-weight: bold;
    padding-right: 0 !important;
    margin-right: 7px;
    border: 1px solid ${p => p.theme.colors.primaryInverse};
`;
