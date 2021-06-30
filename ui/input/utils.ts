export const validate = (number: number) =>
  !(number < 1 || number > 9999 || !Number.isInteger(number));
