export const getHead = (text: string, needle: string) => {
  const index = text.indexOf(needle);
  if (index === -1) return text;
  return text.substring(0, index);
};

export const getTails = (text: string, needle: string) => {
  const index = text.indexOf(needle);
  if (index === -1) return text;
  return text.substring(index + needle.length,);
};