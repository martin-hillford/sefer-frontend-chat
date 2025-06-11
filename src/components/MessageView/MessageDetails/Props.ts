import IncomingMessage from 'types/IncomingMessage';

interface MessageDetailsProps {
    message: IncomingMessage
    searchTerm: string | undefined
    onQuote: (message : IncomingMessage) => any
    markAsRead?: boolean | undefined
}

export default MessageDetailsProps;
