import MessageType from './MessageType';
import User from './User';

interface Receiver {

    /** Holds if the user has read the message */
    hasRead : boolean;

    /** Holds when the user has read the message */
    readDate?: string | null | undefined

    /** Holds the name of user */
    userName: string;

    /** Holds the id of user */
    userId: number;
}

interface IncomingMessage {

    /** The unique id for this message */
    id: number;

    /** The Channel this message is send into */
    channelId : number;

    /** The id of the user that has sent the message */
    senderId : number;

    /** Holds the name of the sender */
    senderName : string

    /** The time the sender has sent the message */
    senderDate: string;

    /** Holds if the user is sender of this message */
    isSender?: boolean | null | undefined;

    /** The id of message that is being quoted */
    quotedMessageId? : number;

    /** The text of the quoted message (stripped) */
    quotedMessage? : string

    /** (optional) The user that has sent the quoted message */
    quotedUser? : string

    /** The Type of the message */
    type: MessageType

    /** Holds if the sender has deleted the message */
    isDeleted? : boolean

    /** Holds a list of receivers of the message */
    receivers : Receiver[];

    /** Holds the content of the message */
    content : any;

    /** Holds the status of the message */
    sendState: 'sending' | 'success' | 'delivered' | 'sending-error' | 'message-not-send' | 'not-in-channel'

    /** When sending a message, the client will assign a temporary id so it can be tracked while sending  */
    tempId? : string
}

export const isReadByUser = (message: IncomingMessage, user: User) => {
  if (message.isSender) return true;
  return message.receivers?.find(r => r.userId === user.id)?.hasRead ?? false;
};

export default IncomingMessage;
export type { Receiver };
