import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import BadgeEvent from 'types/BadgeEvent';
import ChannelStateInfo from 'types/ChannelStateInfo';
import { EventHandler } from 'types/EventHandler';
import { IConnector } from 'types/IConnector';
import IncomingMessage from 'types/IncomingMessage';
import { JoinChannelResult } from 'types/JoinChannelResult';
import MessagesRead from 'types/MessagesRead';
import OutgoingMessage from 'types/OutgoingMessage';
import SendMessageResult from 'types/SendMessageResult';
import User from 'types/User';
import { ChannelReceivers } from 'types/ChannelReceivers';

// eslint-disable-next-line no-console
const logError = (error: any) => console.log('connector error', error);

export class Connector implements IConnector {
  private readonly connection: HubConnection;

  private channelId: number | null;

  private user: User;

  public onBadgeUpdate = new EventHandler<BadgeEvent>();

  public onMessageSend = new EventHandler<SendMessageResult>();

  public onMessageSending = new EventHandler<OutgoingMessage>();

  public onMessageDelivered = new EventHandler<IncomingMessage>();

  public onMessageReceived = new EventHandler<IncomingMessage>();

  public onMessagesRead = new EventHandler<MessagesRead>();

  public onChannelStateChange = new EventHandler<ChannelStateInfo>();

  public onConnected = new EventHandler<void>();

  public onDisconnected = new EventHandler<void>();

  public onChannelReceiversChanged = new EventHandler<ChannelReceivers>();

  constructor(connection: HubConnection, user: User) {
    this.connection = connection;
    this.channelId = null;
    this.user = user;

    const ref = this;

    const connected = () => { ref.connected(); };
    const disconnected = () => { ref.disconnected(); };

    // start and set up the close handler
    connection.start().then(connected).catch(logError);
    connection.onclose(disconnected);
    connection.onreconnected(connected);
    connection.onreconnecting(disconnected);

    // Deal with incoming message
    connection.on('onJoinChannel', args => ref.channelJoinedHandler(args));
    connection.on('onReportedChannelState', args => ref.reportedChannelStateHandler(args));
    connection.on('onReportChannelState', args => ref.reportChannelStateHandler(args));
    connection.on('onMessageReceive', args => ref.messageReceivedHandler(args));
    connection.on('onMessageSend', args => ref.messageSendHandler(args));
    connection.on('onMessageRead', args => ref.messageReadHandler(args));
    connection.on('onChannelReceiversChanged', args => ref.channelReceiversChanged(args));
  }

  disconnect() {
    this.connection?.stop();
  }

  isConnected = () => this.connection?.state === HubConnectionState.Connected;

  joinChannel(channelId: number) {
    // Connect to the server and announce that user want to join the given channel
    const ref = this;
    this.channelId = channelId;
    this.connection
      .invoke('JoinChannel', channelId)
      .catch(() => { ref.leaveChannel(channelId); });
  }

  leaveChannel(channelId: number) {
    if (!this.connection || !this.isConnected()) return;
    this.connection
      .invoke('LeaveChannel', channelId)
      .catch(logError);
    this.channelId = null;
  }

  /** This message will send the given message */
  sendMessage(message : OutgoingMessage) {
    // Notify any listener a message is being sent
    this.onMessageSending.dispatch(message);

    // Send the message
    this.connection
      .invoke('SendMessage', message)
      .catch((err) => {
        const event = { result: 'sending-error', exception: err, tempId: message.tempId, messageId: null } as SendMessageResult;
        this.onMessageSend.dispatch(event);
      });
  }

  /** this method marks the given messages as read */
  markMessageAsRead(channelId: number, messageId: number) {
    this.connection
      .invoke('MessagesRead', channelId, messageId)
      .catch(logError);
  }

  /**  ask to report the current state to the given user */
  reportChannelStateHandler(requestInfo : any) {
    // Ignore the message if it is not for us
    if (this.channelId !== requestInfo.channelId) return;

    // report that the current user is online
    this.connection
      .invoke('ReportChannelState', requestInfo.channelId, 'online', requestInfo.userId)
      .catch(logError);
  }

  /** reports the state of a user in a channel, state can be 'online' or 'leave' */
  private reportedChannelStateHandler(stateInfo : any) {
    if (!stateInfo || stateInfo.userId === this.user.id) return;

    try {
      this.onChannelStateChange.dispatch(stateInfo);
    } catch (err) { }
  }

  /** This handler responses from the server when a message has been sent by this user */
  private messageSendHandler(messageInfo : SendMessageResult) {
    if (!messageInfo) return;
    this.onMessageSend.dispatch(messageInfo);
  }

  /** confirmation that a channel is joined, a list with user in that channel id is sent */
  private channelJoinedHandler(channelInfo : JoinChannelResult) {
    if (!channelInfo || !this.channelId) return;
    if (channelInfo.channelId !== this.channelId) return;

    // And now simply ask who is online
    this.connection
      .invoke('WhoIsInChannel', this.channelId)
      .catch(logError);
  }

  /** A new message has been received (can be outside the current channel) */
  private messageReceivedHandler(message: IncomingMessage) {
    // If the message is not send by this user, update the badge
    if (message.senderId !== this.user.id) this.onBadgeUpdate.dispatch({ channelId: message.channelId, count: 1 });

    // If the message is not send in the current channel, it can be ignored since it
    // will not be shown to the user
    if (message.channelId !== this.channelId) return;

    if (message.senderId !== this.user.id) this.onMessageReceived.dispatch(message);
    else this.onMessageDelivered.dispatch({ ...message, sendState: 'delivered' });
  }

  /** A message is read by a user */
  private messageReadHandler(readInfo : MessagesRead) {
    if (readInfo == null) return;

    if (readInfo.userId === this.user.id) {
      this.onBadgeUpdate.dispatch({ channelId: readInfo.channelId, count: -1 });
    }

    this.onMessagesRead.dispatch(readInfo);
  }

  /** a channel the user is part of has updated receivers */
  private channelReceiversChanged(info: ChannelReceivers) {
    this.onChannelReceiversChanged.dispatch(info);
  }

  private connected() {
    this.onConnected.dispatch();
  }

  private disconnected() {
    this.onDisconnected.dispatch();
  }
}
