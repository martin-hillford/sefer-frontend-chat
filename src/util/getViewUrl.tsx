import IncomingMessage from 'types/IncomingMessage';
import MessageType from 'types/MessageType';

export const getViewUrl = (message: IncomingMessage) => {
  if (message.type === MessageType.StudentLessonSubmission) {
    const base = (message.isSender) ? '/student/submissions/' : '/mentor/submissions/';
    return `${base}${message.content.submissionId}`;
  }

  if (message.type === MessageType.MentorLessonSubmissionReview) {
    const viewer = (message.isSender) ? 'mentor' : 'student';
    return `/${viewer}/submissions/${message.content.submissionId}`;
  }

  return '';
};
