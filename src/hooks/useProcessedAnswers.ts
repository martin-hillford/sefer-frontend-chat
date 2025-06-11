/* eslint-disable consistent-return */
import ContentBlockType from 'types/ContentBlockType';
import Dictionary from 'types/Dictionary';
import IncomingMessage from 'types/IncomingMessage';
import { toBool } from 'util/toBool';
import localization from '../localization';
import useLanguage from './useLanguage';

export default (message : IncomingMessage | undefined | null) => {
  const language = useLanguage();

  if (!message?.content) return undefined;

  const answer = message.content;
  const hasReview = !!answer.mentorReview && answer.mentorReview.length > 0;
  if (!hasReview) return;

  if (answer.questionType === ContentBlockType.QuestionBoolean) {
    const correct = toBool(answer.correctAnswer) === true;
    const toString = (value : boolean) => (value ? localization[language].true : localization[language].false);

    const given = toBool(answer.textAnswer) === true;
    const valid = correct === given;
    return {
      type: ContentBlockType.QuestionBoolean,
      correct: [toString(correct)],
      given: [toString(given)],
      valid
    };
  }

  if (answer.questionType === ContentBlockType.QuestionOpen) {
    const given = [answer.textAnswer as string];
    return { type: ContentBlockType.QuestionOpen, given, correct: [], valid: undefined };
  }

  if (answer.questionType === ContentBlockType.QuestionMultipleChoice) {
    const correct = choicesToString(answer.questionChoices, answer.correctAnswer);
    const given = choicesToString(answer.questionChoices, answer.textAnswer);
    const valid = correct && given && correct.length === given.length && given.filter(g => correct.includes(g)).length === correct.length;
    return { type: ContentBlockType.QuestionMultipleChoice, correct, given, valid };
  }

  return undefined;
};

const choicesToString = (choices : Dictionary<string>, idString : string) => {
  if (idString === null || idString === '' || idString === undefined) return [];
  let ids = idString.split(',');
  ids = ids.map((s) => s.trim());
  const text = [] as string[];
  ids.forEach((id) => {
    if (choices[id] !== undefined && choices[id] != null && choices[id].length !== 0) text.push(choices[id]);
  });
  return text;
};
