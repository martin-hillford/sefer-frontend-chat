import ChannelType from './ChannelType';
import Receiver from './Receiver';

interface Channel {
    creationDate : string,
    hasPostRights: boolean,
    id: number,
    name: string,
    type: ChannelType
    unreadCount: number
    receivers: Receiver[]
}

export default Channel;