import { isValid } from 'date-fns';

function undefinableDate(value: any) {
  if (value instanceof Date) return value;
  switch (typeof value) {
    case 'string':
      const date = new Date(value);
      return isValid(date) ? date : undefined;
    case 'number':
      return new Date(value);
    case 'object':
      const { year, month } = value ?? {};
      return year && month ? new Date(year, month) : undefined;
    default:
      return undefined;
  }
}

export const undefinable = {
  num(value: any) {
    switch (typeof value) {
      case 'string':
        if (value === '') return undefined;
        return Number(value);
      case 'number':
        return value;
      default:
        return undefined;
    }
  },
  str(value: any) {
    switch (typeof value) {
      case 'string':
        return value;
      case 'number':
        return String(value);
      default:
        return undefined;
    }
  },
  date: undefinableDate,
  monthDate(value: any) {
    const date = undefinableDate(value);
    if (date)
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
      };
  },
};
