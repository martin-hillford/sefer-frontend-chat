import User from '../types/User';

interface ChatContextObject {
    minWidthForComposedView : number
    language: 'nl' | 'en'
    user: User
    culture: 'nl-NL' | 'en-US' | 'en-GB' | 'en-CA' | 'en-AU',
    navigate: (href : string) => void
    onFocusModeEnter? : Function
    onFocusModeLeave? : Function
    maxWidthForChannelView?: number
    showChannelTools?: boolean

    /**
     * This method is called to notify the outside world that a channel has been changed.
     * when undefined is set, no channel is selected.
     * */
    onChannelChanged? : (channelId: number | undefined) => any
}

export default ChatContextObject;
