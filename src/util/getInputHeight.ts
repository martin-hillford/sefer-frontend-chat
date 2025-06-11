import IncomingMessage from 'types/IncomingMessage';

// This method calculated the height that required by the input element
export const getInputHeight = (quotedMessage: IncomingMessage | undefined) => {
  // when there is a quoted message, add 40 pixels
  const baseHeight = (20 * 2) + (2 * 16); // the base height is the height of all the paddings
  const rowHeight = 24;
  return (rowHeight) + baseHeight + (quotedMessage ? 40 : 0);
};
