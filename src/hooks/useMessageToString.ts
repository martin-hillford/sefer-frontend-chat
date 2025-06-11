/* eslint-disable no-case-declarations */
import IncomingMessage from 'types/IncomingMessage';
import MessageType from 'types/MessageType';
import { stripTags } from 'util/stripTags';
import localization from '../localization';
import useLanguage from './useLanguage';
import useProcessedAnswers from './useProcessedAnswers';

export default (message: IncomingMessage | null | undefined) => {
  const language = useLanguage();
  const answerReview = useMentorAnswerReviewText(message);
  const terms = localization[language];

  if (!message) return message;

  switch (message?.type) {
    case MessageType.Text:
      return (message.content as string).replace('&nbsp;', ' ');

    case MessageType.StudentEnrollment:
      return terms.studentEnrollment
        .replace('@course', message.content?.courseName)
        .replace('&nbsp;', ' ');

    case MessageType.MentorAnswerReview:
      return answerReview.replace('&nbsp;', ' ');

    case MessageType.MentorChangeLeave:
      return terms.mentorChangeLeaveMessage
        .replace('@course', message.content)
        .replace('&nbsp;', ' ');

    case MessageType.MentorChangeEnter:
      return terms.mentorChangeEnter
        .replace('@course', message.content)
        .replace('&nbsp;', ' ');

    case MessageType.NameChange:
      return terms.nameChangeMessage
        .replace('@old_name', message.content as string)
        .replace('@new_name', message?.senderName)
        .replace('&nbsp;', ' ');

    default: return null;
  }
};

const useMentorAnswerReviewText = (message: IncomingMessage | null | undefined) => {
  const language = useLanguage();
  const answer = useProcessedAnswers(message);
  const terms = localization[language];

  if (!message || message?.type !== MessageType.MentorAnswerReview) return '';
  if (!answer) return '';

  let text = `${terms.question}\n${stripTags(message.content.questionText)}\n\n${
    terms.answer}\n${answer.given.map(a => `${a}\n`)}\n`;

  if (answer.valid === false) {
    text += `${terms.correct}\n`;
    text += `${answer.correct.map(a => `${a}\n`)}\n`;
  }

  return text + message.content.mentorReview;
};
