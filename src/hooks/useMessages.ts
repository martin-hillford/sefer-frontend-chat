/* eslint-disable no-await-in-loop */
import { Response, useGetAsync } from 'sefer-fetch';
import { useEffect, useState } from 'react';
import Channel from 'types/Channel';
import Message from 'types/IncomingMessage';
import useChannelActions from './useChannelActions';
import useOnMessageDelivered from './useOnMessageDelivered';
import useOnMessageReceived from './useOnMessageReceived';
import useOnMessageSend from './useOnMessageSend';
import useOnMessageSending from './useOnMessageSending';
import useOnMessagesRead from './useOnMessagesRead';

const take = 50;

const fetchData = async (get : (url: string) => Promise<Response<Message[]>>, channelId : number, targetMessageId : number | undefined) => {
  // fetch the data, it will take by default 50 messages
  let result = await get(`/user/channels/${channelId}/messages?take=50`);
  if (!result.ok) return null;

  // If there is no target message, this method is done
  if (!targetMessageId) return result.body;

  // However, is this is not the case, this method will fecht increasingly bigger chuncks to find the message
  let messages = result.body!;
  let contains = messages.find(m => m.id === targetMessageId);

  while (!contains) {
    const takeValue = Math.max(take, messages.length);
    result = await get(`/user/channels/${channelId}/messages?skip=${messages.length}&take=${takeValue}`);
    if (!result.ok) return messages;

    contains = (result.body!).find(m => m.id === targetMessageId);
    messages = messages.concat(result.body!);

    // When there are no more messages to be found, lets give up
    if (result.body?.length === 0) return messages;
  }

  return messages;
};

export default (channel : Channel | undefined, targetMessageId : number | undefined) => {
  const get = useGetAsync<Message[]>();
  const [messages, setMessages] = useState<Message[] | null>();
  const [moreMessageAvailable, setMoreMessageAvailable] = useState(true);
  const [receivedMessageId, setReceivedMessageId] = useState<number | undefined>(undefined);

  // Ensure to hook into all connector actions
  useOnMessageSending(setMessages);
  useOnMessageSend(setMessages);
  useOnMessageReceived(channel, setReceivedMessageId, setMessages);
  useOnMessageDelivered(setMessages);
  useOnMessagesRead(setMessages);
  useChannelActions(channel?.id);

  useEffect(() => {
    // When switching channel clear the messages
    setMessages(undefined);
    setMoreMessageAvailable(true);

    // And start fetching the message
    const fetch = async () => {
      const result = await fetchData(get, channel!.id, targetMessageId);
      if (!result) return setMessages(null);
      // Initially 50 messages are fetched. If there are less than 50 messages everything is loaded
      if (result.length < 50) setMoreMessageAvailable(false);
      return setMessages(result);
    };

    if (channel) fetch().then();
  }, [channel, targetMessageId]);

  const retrieveAdditional = async () => {
    if (!messages || !moreMessageAvailable) return;

    const skip = messages.length;
    const result = await get(`/user/channels/${channel!.id}/messages?skip=${skip}&take=${take}`);

    if (!result.ok || !result.body) return;

    setMessages([...messages, ...result.body]);
    if (result.body.length < take) setMoreMessageAvailable(false);
  };

  const resetReceived = () => setReceivedMessageId(undefined);
  return { messages, receivedMessageId, resetReceived, retrieveAdditional, moreMessageAvailable };
};
