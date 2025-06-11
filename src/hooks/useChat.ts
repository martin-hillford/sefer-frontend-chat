import { FetchContext } from 'sefer-fetch';
import { HubConnectionBuilder, LogLevel, RetryContext } from '@microsoft/signalr';
import { Connector } from 'classes/Connector';
import User from 'types/User';

export default () => {
  const { chat } = (window as any);
  if (chat) return chat as Connector;
  return undefined;
};

export const disconnect = () => {
  (window as any).chat = null;
};

const oneMinuteReconnectPolicy = {
  nextRetryDelayInMilliseconds: (retryContext: RetryContext) => {
    if (retryContext.previousRetryCount < 1) return 10;
    if (retryContext.previousRetryCount < 10) return 100;
    if (retryContext.previousRetryCount < 100) return 1000;
    return 2000;
  }
};

export const connect = (fetchContext: FetchContext, user: User) => {
  if ((window as any).chat) return;
  const { config } = fetchContext;

  const options = { accessTokenFactory() { return fetchContext.user?.token ?? ''; } };
  const connection = new HubConnectionBuilder()
    .withUrl(`${config.api}/chat/server`, options)
    .withAutomaticReconnect(oneMinuteReconnectPolicy)
    .configureLogging(LogLevel.Information)
    .build();
  (window as any).chat = new Connector(connection, user);
};
