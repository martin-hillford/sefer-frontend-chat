import useChatContext from '../context/useChatContext';
import useMediaQuery from './useMediaQuery';

export default () => {
  const { minWidthForComposedView } = useChatContext();
  return !useMediaQuery(`min-width: ${minWidthForComposedView}px`);
};
