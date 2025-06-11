interface OutgoingMessage
{
    /** The text for the message */
    content: string

    /** The channelId into which the message is sent */
    channelId: number;

    /** Some tempId used by the sending client */
    tempId: string;

    /** The id of message that is being quoted */
    quotedMessageId? : number | null | undefined;

    /** The text of the quoted message (stripped) */
    quotedMessage? : string | null | undefined;

    /** (optional) The user that has sent the quoted message */
    quotedUser? : string

    /** The id of the user that has sent the message */
    senderId : number;

    /** Holds the name of the sender */
    senderName : string

    /** a list of expected receivers of this message  */
    receivers: { userId: number, userName: string }[]
}

export default OutgoingMessage;
