import type { Color } from './palette';
import { colors } from './palette';

/** @deprecated 아직 사용 X */
export const colorUtil = {
  parse(color: Color | undefined): string | undefined {
    if (color && colors[color]) {
      return colors[color];
    }

    return undefined;
  },
};
