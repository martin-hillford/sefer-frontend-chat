import { IConnector } from '../types/IConnector';
import { Connector } from './Connector';

/**
 * ConnectorStore is used for storing the signalR connection
 */
class ConnectorStore {
  private connector = null as Connector | null;

  private listeners = [] as Array<Function>;

  set = (connector : Connector | null) => {
    if (!connector && this.connector) this.connector.disconnect();
    this.connector = connector;
    this.listeners.forEach(listener => listener());
  };

  subscribe = (listener : Function) => {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  };

  getSnapshot = () => {
    if (this.connector === null) return null;
    return this.connector as IConnector;
  };
}

export const container = new ConnectorStore();
