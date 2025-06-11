import styled, { useTheme } from 'styled-components';
import useLanguage from 'hooks/useLanguage';
import useChatContext from 'context//useChatContext';
import localization from 'localization';
import { Left } from 'icons';

export default (props: {show: boolean}) => {
  const { show } = props;
  const language = useLanguage();
  const { navigate } = useChatContext();
  const theme = useTheme();
  const back = () => { navigate('/user/dashboard'); };

  if (!show) return null;
  return (
    <BackBar onClick={back}>
      <div><Left color={theme.colors.primary} height={24} /></div>
      <div>{localization[language].dashboard}</div>
    </BackBar>
  );
};

const BackBar = styled.div`
  top: 0;
  width: 100%;
  height: 60px;
  z-index:2;
  display: flex;
  padding-left: 20px;
  padding-top: 10px;
  border-bottom:  1px solid ${p => p.theme.colors.defaultSupport};
  cursor: pointer;
  color: ${p => p.theme.colors.primary};
  &:hover { color: ${p => p.theme.colors.secondary}; }

  div { line-height: 40px; padding-right: 8px; cursor: pointer; }
  div:first-child { width: 32px; margin-left: -8px; margin-right: 8px;  }
  svg { height: 24px; width: 24px; margin-top:8px; margin-bottom:8px; cursor: pointer; }
`;
