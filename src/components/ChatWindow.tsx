import { FetchContextProvider } from 'sefer-fetch';
import { UserRole } from 'types/User';
import Chat from './Chat';

interface Props {
    userRole : UserRole
    userId: number
    userName: string
    token : string,
    api: string,
    minWidthForComposedView? : number
    initialChannelId? : number | null | undefined
    initialMessageId? : number | null | undefined
    showBackToDashboard?: boolean
    showChannelTools? : boolean
}

export default (props : Props) => {
  const { token, api, minWidthForComposedView = 800, showBackToDashboard, showChannelTools, userId, userRole, userName, initialMessageId, initialChannelId } = props;

  const user = { id: userId, role: userRole, name: userName };
  const fetchContext = { config: { api }, user: { token } };

  return (
    <FetchContextProvider context={fetchContext}>
      <Chat
        initialChannelId={initialChannelId}
        minWidthForComposedView={minWidthForComposedView}
        language="nl"
        culture="nl-NL"
        navigate={(href : string) => window.open(href)}
        user={user}
        initialMessageId={initialMessageId}
        showBackToDashboard={showBackToDashboard}
        showChannelTools={showChannelTools}
      />
    </FetchContextProvider>
  );
};
