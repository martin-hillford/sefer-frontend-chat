import BadgeEvent from './BadgeEvent';
import ChannelStateInfo from './ChannelStateInfo';
import IEventHandler from './EventHandler';
import IncomingMessage from './IncomingMessage';
import MessagesRead from './MessagesRead';
import OutgoingMessage from './OutgoingMessage';
import SendMessageResult from './SendMessageResult';

export interface IConnector {

    onBadgeUpdate: IEventHandler<BadgeEvent>;

    onMessageSend: IEventHandler<SendMessageResult>;

    onMessageSending: IEventHandler<OutgoingMessage>;

    onMessageDelivered: IEventHandler<IncomingMessage>;

    onMessageReceived: IEventHandler<IncomingMessage>;

    onMessagesRead: IEventHandler<MessagesRead>;

    onChannelStateChange: IEventHandler<ChannelStateInfo>;

    markMessageAsRead(channelId: number, messageId: number) : void;

    joinChannel(channelId: number): void;

    leaveChannel(channelId: number): void;

    sendMessage(message : OutgoingMessage) : void;

    isConnected(): boolean;
}
