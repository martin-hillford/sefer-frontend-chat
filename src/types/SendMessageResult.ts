interface SendMessageResult {
    result: 'success' | 'sending-error' | 'message-not-send' | 'not-in-channel'
    tempId: string,
    messageId: string | null
    exception? : any
}

export default SendMessageResult;