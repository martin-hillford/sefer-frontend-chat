import styled from 'styled-components';
import { clamp } from 'util/clamp';
import { isEmpty } from 'util/isEmpty';
import { stripTags } from 'util/stripTags';
import MessageDetailsProps from './Props';

export default (props : MessageDetailsProps) => {
  const { message } = props;
  const text = clamp(stripTags(message?.quotedMessage) ?? '', 60);
  if (isEmpty(text)) return null;
  const isSender = message.isSender === true;

  const onClick = () => {
    document.getElementById(`message_${message.quotedMessageId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return <Quote onClick={() => onClick()} isSender={isSender}>{text}</Quote>;
};

const Quote = styled.blockquote<{isSender: boolean}>`
  border-right: ${p => (p.isSender ? 2 : 0)}px solid ${p => p.theme.colors.default};
  border-left: ${p => (p.isSender ? 0 : 2)}px solid ${p => p.theme.colors.default};
  color: ${p => p.theme.colors.default};
  font-style: italic;
  padding:4px;

  padding-right: ${p => (p.isSender ? 12 : 0)}px;
  padding-left: ${p => (p.isSender ? 0 : 12)}px;
  cursor: pointer;

  margin: 0;
  margin-bottom: 14px;
`;
