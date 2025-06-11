export const clamp = (text: string, max:number) => {
  if (text.length <= max) return text;
  const subString = text.substring(0, max);
  const space = subString.lastIndexOf(' ');
  const result = (space === -1) ? space : subString.substring(0, space);
  return `${result}\u2026`;
};
