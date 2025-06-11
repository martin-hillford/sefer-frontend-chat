interface ChannelState {
    channelId: number
    online: { userId: number }[];
}

export default ChannelState;