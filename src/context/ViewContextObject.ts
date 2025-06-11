import Channel from '../types/Channel';
import ViewMode from '../types/ViewMode';
import ChannelTool from '../types/ChannelTool';

export interface ViewContextObject {
    /**
     * This represents the currently selected channel.
     * Note that even on mobile, when only the messages are displayed, this value will still be set.
     */
    selectedChannel: Channel

    /**
     * This represents the current viewMode.
     * When set to 'Channel' only the column with the channel(tools) should be shown.
     * When set to 'Messages' only the column with the messages should be shown.
     * When set to 'Both' both the columns show be visible
     */
    viewMode: ViewMode

    /**
     * This method can be used to show the messages of the given channel.
     * On mobile devices, the view mode will be changed to 'Messages'
     * @param channel The channel that contains the messages.
     */
    onShowMessages: (channel: Channel) => any

    /**
     * This method should be used to show a given channel tool
     * @param mode
     */
    onShowChannelTool: (mode: ChannelTool) => any
    onBackToChannelOverview: () => any
    onCloseChannelTool: () => any
    isMobile : boolean
    channelTool : ChannelTool

    /**
     * When this method is called the overview of the channels should be reloaded.
     * Can be used e.q. after creating or updating a group chat channel
     */
    onReloadChannels: () => any

    /**
     * An array with all the channels the user is in
     */
    channels : Channel[]

    /**
     * The id of the message to scroll to
     */
    targetMessageId: number | undefined

    /**
     * Get / sets if the back to dashboard navigation should be shown when applicable
     */
    showBackToDashboard: boolean
}
