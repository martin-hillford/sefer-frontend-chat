interface Receiver {
    userId: number,
    userName: string,
    userAvatarUrl: string
    userActive?: boolean | null | undefined
}

export default Receiver;