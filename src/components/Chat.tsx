/* eslint-disable react/jsx-no-constructed-context-values */
import { useFetchContext } from 'sefer-fetch';
import ChatContext from 'context/ChatContext';
import ChatPanel from 'components/ChatPanel';
import { connect } from 'hooks/useChat';
import { useEffect } from 'react';
import ChatProps from './ChatProps';

export default (props : ChatProps) => {
  const { initialChannelId, showBackToDashboard, initialMessageId } = props;
  const context = { ...props };
  const fetchContext = useFetchContext();

  useEffect(() => {
    if (context && fetchContext?.user) connect(fetchContext, context.user);
  }, [context, fetchContext]);

  if (!context || !fetchContext?.user) return null;

  return (
    <ChatContext.Provider value={context}>
      <ChatPanel
        initialChannelId={initialChannelId}
        initialMessageId={initialMessageId}
        showBackToDashboard={showBackToDashboard}
      />
    </ChatContext.Provider>
  );
};
