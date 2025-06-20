import styled, { useTheme } from 'styled-components';
import { useDelete } from 'sefer-fetch';
import { useState } from 'react';
import useLanguage from 'hooks//useLanguage';
import useViewContext from 'context//useViewContext';
import GroupChannel from 'types/GroupChannel';
import localization from 'localization';
import { Close, Trash } from 'icons';
import ButtonGroup from '../../Shared/ButtonGroup';
import Button from '../../Shared/Button';
import Separator from '../ChannelsView/Separator';
import { GroupDeleted, GroupDeletionFailed } from './Messages';

export default (props : { group: GroupChannel, onCloseDialog : () => void }) => {
  const { onCloseDialog, group } = props;
  const deleteAsync = useDelete<{}>();
  const language = useLanguage();
  const [code, setCode] = useState<number | undefined>(undefined);
  const { onBackToChannelOverview, onCloseChannelTool, onReloadChannels } = useViewContext();
  const theme = useTheme();

  const onDelete = async () => {
    const response = await deleteAsync(`/mentor/channels/${group.id}`, null);
    setCode(response.code);
    if (response.code !== 200) return;
    onReloadChannels();
    onBackToChannelOverview();
  };

  return (
    <Container>
      <GroupDeleted show={code === 200} onClose={onCloseChannelTool} />
      <GroupDeletionFailed show={!!code && code !== 200} onClose={() => setCode(undefined)} />
      <div>{localization[language].groupDelete}</div>
      <Separator $show />
      <ButtonGroup>
        <Button
          color="primary"
          onClick={onCloseDialog}
          label={localization[language].cancel}
          icon={<Close color={theme.colors.primaryInverse} />}
        />
        <Button
          icon={<Trash color={theme.colors.primaryInverse} />}
          color="error"
          onClick={onDelete}
          label={localization[language].delete}
        />
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
    padding: 20px;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.25rem;
`;
