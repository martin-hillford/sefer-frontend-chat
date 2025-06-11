/* eslint-disable react/no-danger */
import useMessageToString from 'hooks/useMessageToString';
import { isEmpty } from 'util/isEmpty';
import Envelop from './Envelop';
import MessageDetailsProps from './Props';

export default (props : MessageDetailsProps) => {
  const { message } = props;
  const text = useMessageToString(message);
  if (isEmpty(text)) return null;
  return <Envelop {...props}><div dangerouslySetInnerHTML={{ __html: text! }} /></Envelop>;
};
