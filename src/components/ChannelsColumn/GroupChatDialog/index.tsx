import styled, { useTheme } from 'styled-components';
import { useState } from 'react';
import useLanguage from 'hooks/useLanguage';
import useStudents from 'hooks/useStudents';
import useChatContext from 'context/useChatContext';
import useViewContext from 'context/useViewContext';
import localization from 'localization';
import { Save } from 'icons';
import Toolbar from '../ChannelsView/Toolbar';
import Input from '../ChannelsView/Input';
import Button from '../../Shared/Button';
import StudentSelector from './StudentSelector';
import useGroupChannel from './useGroupChannel';
import usePostGroupChannel from './usePostGroupChannel';
import Separator from '../ChannelsView/Separator';
import { GroupSaved, GroupSavingFailed } from './Messages';
import ActionBar from './ActionBar';
import Loading from './Loading';
import DeleteGroup from './DeleteGroup';

export default () => {
  const { selectedChannel, onBackToChannelOverview, channelTool, channels } = useViewContext();
  const { onSaveChannel, state } = usePostGroupChannel();
  const { user } = useChatContext();
  const [showDelete, setShowDelete] = useState(false);
  const students = useStudents(user.id);
  const { removeStudent, addStudent, groupChannel, setName } = useGroupChannel(selectedChannel, channelTool);
  const theme = useTheme();
  const language = useLanguage();

  if (!students) return <Loading />;
  if (showDelete) return <DeleteGroup group={groupChannel} onCloseDialog={() => setShowDelete(false)} />;

  const showSeparator = students.active.length > 0 && students.inactive.length > 0;

  const onSelect = (studentId : number, checked: boolean) => {
    if (checked) addStudent(studentId);
    else removeStudent(studentId);
  };

  const onSaved = () => {
    // technically 'onReloadChannels' should be called. however, the websocket will also send
    // an event with those instructions. Therefore, not calling it here will prevent a double reload.
    onBackToChannelOverview();
  };

  return (
    <>
      <GroupSaved show={state === 'success'} onClose={onSaved} />
      <GroupSavingFailed show={state === 'failed'} onClose={() => {}} />
      <Toolbar showBackToApp={false}>
        <Input
          hasError={state === 'invalid'}
          value={groupChannel.name}
          onChange={setName}
          placeholder={localization[language].groupName}
        />
        <Button
          onClick={() => onSaveChannel(groupChannel, channels)}
          icon={(<Save height={24} color={theme.colors.defaultInverse} />)}
          disabled={state === 'pending'}
        />
      </Toolbar>
      <Container>
        {students.active.map(student => (
          <StudentSelector
            selected={groupChannel.students.includes(student.studentId)}
            active
            key={student.studentId}
            student={student}
            onSelect={onSelect}
          />
        ))}
        <Separator show={showSeparator} />
        {students.inactive.map(student => (
          <StudentSelector
            selected={groupChannel.students.includes(student.studentId)}
            active={false}
            key={student.studentId}
            student={student}
            onSelect={onSelect}
          />
        ))}
        <Separator show />
        <ActionBar onDeleteClick={() => setShowDelete(true)} />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding:0 20px 20px;
`;
