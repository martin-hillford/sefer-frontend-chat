export const toBool = (value: string | number | null | undefined) => {
  const stringValue = value?.toString().toLowerCase();
  switch (stringValue) {
    case 'true':
    case 'correct':
    case '1':
      return true;
    case undefined:
    case null:
      return undefined;
    default:
      return false;
  }
};
