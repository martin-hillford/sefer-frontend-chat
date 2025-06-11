export interface JoinChannelResult {
    channelId: number,
    users: { id: number, name: string }[]
}