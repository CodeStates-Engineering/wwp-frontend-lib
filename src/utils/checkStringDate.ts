export const checkStringDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};
