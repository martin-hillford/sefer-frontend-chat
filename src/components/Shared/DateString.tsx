import useChatContext from 'context/useChatContext';

export default (props : {value: string | null | undefined, empty?: string | null }) => {
  const { value, empty } = props;
  const { culture } = useChatContext();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!value) return <>{empty}</>;
  const date = parseDate(value);
  return <>{date.toLocaleDateString(culture)}</>;
};

const parseDate = (value : string) => {
  let timestamp = Date.parse(`${value}Z`);
  if (Number.isNaN(timestamp)) timestamp = Date.parse(value);
  return new Date(timestamp);
};
