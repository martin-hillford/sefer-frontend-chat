import TextInput from 'components/Shared/TextInput';
import styled from 'styled-components';

interface Props {
    value : string
    onChange: (value: string) => any;
    placeholder: string
    hasError?: boolean
}

export default (props: Props) => {
  const { value, onChange, placeholder, hasError } = props;
  return (
    <Container>
      <TextInput hasError={hasError} property="property" onChange={onChange} value={value} placeholder={placeholder} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  > :first-child {
    flex: 1 1 auto;
  }

  > :last-child {
    padding-left: 6px;
    margin-top: 4px;
  }
`;
