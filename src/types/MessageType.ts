enum MessageType
{
    /** This defines a message in which a lesson is submitted from the student to mentor */
    StudentLessonSubmission = 'StudentLessonSubmission',

    /** This defines a message in which is a chat message from one to another user */
    Text = 'Text',

    /** This defines a message in which a lesson is submitted from the student to mentor */
    NameChange = 'NameChange',

    /** This defines a message in which a lesson submission is reviewed by the mentor to the student */
    MentorLessonSubmissionReview = 'MentorLessonSubmissionReview',

    /** This defines a message which tells that a student signed up */
    StudentEnrollment = 'StudentEnrollment',

    /** This defines a message that is a review of an answer */
    MentorAnswerReview = 'MentorAnswerReview',

    /** This defines that a student has left the mentor and changed to another */
    MentorChangeLeave = 'MentorChangeLeave',

    /** This defines that a student has left other mentor and changed to this mentor */
    MentorChangeEnter = 'MentorChangeEnter',
}

export default MessageType;
