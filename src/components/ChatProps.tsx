import { FetchContext } from "sefer-fetch";
import User from 'types/User';

interface ChatProps {
  minWidthForComposedView : number
  language: 'nl' | 'en'
  user: User
  culture: 'nl-NL' | 'en-US' | 'en-GB' | 'en-CA' | 'en-AU',
  navigate: (href : string) => void
  initialChannelId? : number | null | undefined
  initialMessageId? : number | null | undefined
  showBackToDashboard?: boolean
  showChannelTools?: boolean
  onFocusModeEnter? : Function
  onFocusModeLeave? : Function
  maxWidthForChannelView?: number
  onChannelChanged? : (channelId: number | undefined) => any
  fetchContext? : FetchContext
}

export default ChatProps;
