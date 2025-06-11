import { Close } from 'icons';
import styled, { useTheme } from 'styled-components';
import { isEmpty } from 'util/isEmpty';
import { stripTags } from 'util/stripTags';

interface Props {
    quotedMessage: string | undefined | null;
    stopQuoting : () => any
}

export default (props : Props) => {
  const { quotedMessage, stopQuoting } = props;
  const theme = useTheme();
  const text = stripTags(quotedMessage);
  if (isEmpty(quotedMessage)) return null;

  return (
    <Container>
      <Text>{text}</Text>
      <CloseButton onClick={() => stopQuoting()}>
        <Close height={24} color={theme.colors.defaultInverse} />
      </CloseButton>
    </Container>
  );
};

const Text = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  line-height: 40px;
  font-size: 0.875rem;
  padding: 0 20px;
`;

const Container = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  background-color: ${p => p.theme.colors.secondary};
  color: ${p => p.theme.colors.secondaryInverse};
`;

const CloseButton = styled.div`
  flex: 0 0 32px;
  svg { height: 24px; width: 24px; margin-top: 8px; }
  padding-right: 8px;
  cursor: pointer;
`;
