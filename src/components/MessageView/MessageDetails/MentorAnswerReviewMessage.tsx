/* eslint-disable consistent-return */
import TextWithLinks from 'components/Shared/TextWithLinks';
import useLanguage from 'hooks/useLanguage';
import useProcessedAnswers from 'hooks/useProcessedAnswers';
import { Close } from 'icons';
import styled, { useTheme } from 'styled-components';
import { stripTags } from 'util/stripTags';
import localization from 'localization';
import Envelop from './Envelop';
import MessageDetailsProps from './Props';

export default (props : MessageDetailsProps) => {
  const language = useLanguage();
  const { message } = props;

  const answer = useProcessedAnswers(message);
  if (!answer || answer.given.length === 0) return null;

  return (
    <Envelop {...props}>
      <Label>{localization[language].question}</Label>
      <Value>{stripTags(message.content.questionText)}</Value>

      <Label>{localization[language].answer} <Result value={answer.valid} /></Label>
      <Value>
        {answer.given.map(a => <div key={a}>{a}</div>)}
      </Value>

      {answer.valid === false && (
        <>
          <Label>{localization[language].correct}</Label>
          <Value>
            {answer.correct.map(a => <div key={a}>{a}</div>)}
          </Value>
        </>
      )}

      <Label>{localization[language].review}</Label>
      <Value>
        <TextWithLinks text={message.content.mentorReview} />
      </Value>
    </Envelop>
  );
};

const Label = styled.div`
  font-weight: bold;

    display: flex;


  svg {
    height: 20px;
    width:  20px;
    color: ${p => p.theme.colors.error};
  }
`;

const Value = styled.div`
  padding-bottom: 20px;

`;

const Result = (props : { value: boolean | undefined}) => {
  const { value } = props;
  const theme = useTheme();
  if (value !== false) return null;
  return <>(<Close height={20} color={theme.colors.error} />)</>;
};
