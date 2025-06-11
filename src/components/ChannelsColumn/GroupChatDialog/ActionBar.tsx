import styled, { useTheme } from 'styled-components';
import useLanguage from 'hooks/useLanguage';
import useViewContext from 'context/useViewContext';
import localization from 'localization';
import { Trash } from 'icons';
import Button from '../../Shared/Button';
import useGroupChannel from './useGroupChannel';
import ButtonGroup from '../../Shared/ButtonGroup';

export default (props : { onDeleteClick : () => any}) => {
  const { onDeleteClick } = props;
  const { selectedChannel, onCloseChannelTool, channelTool } = useViewContext();
  const { groupChannel } = useGroupChannel(selectedChannel, channelTool);
  const theme = useTheme();
  const language = useLanguage();

  const isNewChannel = groupChannel.id < 1;

  return (

    <CancelContainer>
      <ButtonGroup>
        <Button color="primary" onClick={onCloseChannelTool} label={localization[language].cancel} />
        {!isNewChannel && <Button color="error" onClick={onDeleteClick} icon={<Trash color={theme.colors.primaryInverse} />} />}
      </ButtonGroup>
    </CancelContainer>
  );
};

const CancelContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-top: 10px;
`;
