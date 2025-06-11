import styled from 'styled-components';
import Student from 'types//Student';
import { Container } from '../ChannelsView/Styled';
import Avatar from '../../Shared/Avatar';
import CheckBox from '../../Shared/CheckBox';
import Spacer from '../../Shared/Spacer';

interface Props {
    student : Student,
    active: boolean,
    selected:boolean,
    onSelect: (studentId : number, selected: boolean) => any
}

export default (props : Props) => {
  const { student, active, selected, onSelect } = props;
  const onChange = (value: boolean) => onSelect(student.studentId, value);
  return (
    <Container selected={false} disabled={false}>
      <div><Avatar grayscale={!active} size={28} avatarUrl={student.studentAvatarUrl} /></div>
      <div>{student.studentName}</div>
      <Spacer />
      <CheckBoxContainer>
        <CheckBox onChange={onChange} selected={selected} />
      </CheckBoxContainer>
    </Container>
  );
};

const CheckBoxContainer = styled.div`
    padding-right: 10px;
`;
