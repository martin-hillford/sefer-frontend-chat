import Block from 'components/Shared/Block';
import Button from 'components/Shared/Button';
import Text from 'components/Shared/Text';
import useLanguage from 'hooks/useLanguage';
import styled from 'styled-components';
import localization from '../localization';
import Center from './Shared/Center';

export default () => {
  const language = useLanguage();

  return (
    <Block>
      <Text variant="h1">{localization[language].title}</Text>
      <Center>
        <Text margin={0}>{localization[language].noChannel}</Text>
      </Center>
      <Padding>
        <Center>
          <Button href="/user/dashboard" label={localization[language].dashboard} />
        </Center>
      </Padding>
    </Block>
  );
};

const Padding = styled.div`
  padding-top:40px;
`;
