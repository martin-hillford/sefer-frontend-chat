import Channel from 'types/Channel';

interface Props {
    onBrowseToMessage : (messageId : number, channel : Channel, searchTerm: string | undefined) => any
    showBackToDashboard?: boolean
}

export default Props;
