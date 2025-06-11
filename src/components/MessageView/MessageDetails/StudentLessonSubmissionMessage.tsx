import Link from 'components/Shared/Link';
import useLanguage from 'hooks/useLanguage';
import { getViewUrl } from 'util/getViewUrl';
import { getHead, getTails } from 'util/subString';
import localization from 'localization';
import Envelop from './Envelop';
import MessageDetailsProps from './Props';

export default (props : MessageDetailsProps) => {
  const { message } = props;
  const language = useLanguage();
  const terms = localization[language];

  const term = terms.studentLessonSubmission
    .replace('@course', message.content?.course?.name)
    .replace('@lesson', message.content?.lesson?.header)
    .replace('&nbsp;', ' ');

  const heads = getHead(term, '@url');
  const tails = getTails(term, '@url');
  const url = getViewUrl(message);

  return (
    <Envelop {...props}>
      {heads}<Link href={url}>{terms.studentLessonSubmissionLabel}</Link>{tails}
    </Envelop>
  );
};
