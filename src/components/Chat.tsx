/* eslint-disable react/jsx-no-constructed-context-values */
import { FetchContextProvider, useFetchContext } from 'sefer-fetch';
import ChatContext from 'context/ChatContext';
import ChatPanel from 'components/ChatPanel';
import { connect } from 'hooks/useChat';
import { useEffect } from 'react';
import ChatProps from './ChatProps';

export default (props : ChatProps) => {
  const { initialChannelId, showBackToDashboard, initialMessageId } = props;
  const context = { ...props };
  const fetchContext = useFetchContext() ?? props.fetchContext;

  useEffect(() => {
    if (context && fetchContext?.user) connect(fetchContext, context.user);
  }, [context, fetchContext]);

  // Add some additional logging to help with debugging
  if (!context) console.log('context is null or undefined');
  else if (!fetchContext) console.log('fetchContext is null or undefined');
  else if (!fetchContext?.user) console.log('fetchContext user is null or undefined');

  // Check and return if no context is available
  if (!context || !fetchContext?.user) return null;

  return (
    <ChatContext.Provider value={context}>
      <FetchContextProvider context={fetchContext}>
        <ChatPanel
          initialChannelId={initialChannelId}
          initialMessageId={initialMessageId}
          showBackToDashboard={showBackToDashboard}
        />
      </FetchContextProvider>
    </ChatContext.Provider>
  );
};
