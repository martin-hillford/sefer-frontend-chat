import styled from 'styled-components';
import { isEmpty } from 'util/isEmpty';
import TextWithLinks from '../../Shared/TextWithLinks';
import Envelop from './Envelop';
import MessageDetailsProps from './Props';

export default (props : MessageDetailsProps) => {
  const { message, searchTerm } = props;
  const text = message.content as string;
  if (isEmpty(text)) return null;
  return <Envelop {...props}><Text><TextWithLinks mark={searchTerm} text={text} /></Text></Envelop>;
};

const Text = styled.span`
  word-break: break-word;
  hyphens: auto;
`;
