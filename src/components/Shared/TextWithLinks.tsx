/* eslint-disable react/jsx-no-useless-fragment */
import Link from 'components/Shared/Link';
import { useMemo } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'util/isEmpty';
import { stripTags } from 'util/stripTags';
import { getHead, getTails } from 'util/subString';

export default (props : { text: string, mark?: string}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { text, mark } = props;

  if (isEmpty(text)) return null;

  if (!containsLink(text)) return <Mark text={text} term={mark} />;

  const parts = useMemo(() => split(stripTags(text) ?? ''), [text]);
  // eslint-disable-next-line react/no-array-index-key
  return <>{parts.map((value, index) => <Value mark={mark} key={index} content={value} />)}</>;
};

const containsLink = (text: string) => text.includes('http:') || text.includes('https:') || text.includes('www.');

const Value = (props : { mark : string| undefined, content: { type: string, value : string} }) => {
  const { content, mark } = props;
  const { type, value } = content;

  if (type !== 'link') return <Mark text={`${value} `} term={mark} />;
  return <><Link target="_blank" href={value}>{value}</Link> </>;
};

const split = (text: string) => text
  .split(' ')
  .filter(t => !isEmpty(t))
  .map(analyze);

const analyze = (text: string) => {
  if (text.startsWith('https://')) return { type: 'link', value: text };
  if (text.startsWith('http://')) return { type: 'link', value: text };
  if (text.startsWith('www.')) return { type: 'link', value: `https://${text}` };
  return { type: 'text', value: text };
};

const Mark = (props : { text: string, term: string | undefined}) => {
  const { term, text } = props;

  if (!term || !text.includes(term)) return <NewLine text={text} />;

  const head = getHead(text, term);
  const tail = getTails(text, term);

  return (
    <>
      <NewLine text={head} />
      <Bold><NewLine text={term} /></Bold>
      <Mark text={tail} term={term} />
    </>
  );
};

const NewLine = (props : { text: string}) => {
  const { text } = props;
  if (isEmpty(text)) return null;
  const parts = text.trim().replace('\r\n', '\n').split('\n');
  if (parts.length === 1) return <>{text}</>;
  return parts.reduce((content, current, index) => {
    if (index === 0) return <>{current}</>;
    return <>{content}<br />{current}</>;
  }, <></>);
};

const Bold = styled.span`
font-weight: bold;
`;
