import type { Color } from './palette';
import { colors } from './palette';

export const colorUtil = {
  parse(color: Color | undefined): string | undefined {
    if (color && colors[color]) {
      return colors[color];
    }

    return undefined;
  },
};