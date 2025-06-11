import useChatContext from '../context/useChatContext';

export default () => {
  const { language } = useChatContext();
  return language;
};
