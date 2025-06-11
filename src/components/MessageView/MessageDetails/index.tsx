import MessageType from 'types/MessageType';
import BaseMessage from './BaseMessage';
import MentorAnswerReviewMessage from './MentorAnswerReviewMessage';
import MentorLessonSubmissionReviewMessage from './MentorLessonSubmissionReviewMessage';
import MessageDetailsProps from './Props';
import StudentLessonSubmissionMessage from './StudentLessonSubmissionMessage';
import TextMessage from './TextMessage';

export default (props : MessageDetailsProps) => {
  const { message } = props;
  switch (message.type) {
    case MessageType.Text: return <TextMessage {...props} />;
    case MessageType.MentorAnswerReview: return <MentorAnswerReviewMessage {...props} />;
    case MessageType.StudentLessonSubmission: return <StudentLessonSubmissionMessage {...props} />;
    case MessageType.MentorLessonSubmissionReview: return <MentorLessonSubmissionReviewMessage {...props} />;
    default: return <BaseMessage {...props} />;
  }
};