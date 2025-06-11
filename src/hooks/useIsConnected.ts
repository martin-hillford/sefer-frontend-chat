import { useEffect, useReducer } from 'react';
import useChat from './useChat';

export default () => {
  const connector = useChat();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if (!connector) { forceUpdate(); return () => {}; }

    connector.onDisconnected.addListener(forceUpdate);
    connector.onConnected.addListener(forceUpdate);

    return () => {
      connector.onConnected.removeListener(forceUpdate);
      connector.onDisconnected.removeListener(forceUpdate);
    };
  }, [connector]);

  return connector?.isConnected() === true;
};