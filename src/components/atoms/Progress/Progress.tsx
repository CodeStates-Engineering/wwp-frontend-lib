import { cleanClassName } from '../../../utils';
import scss from './Progress.module.scss';

type Color = 'green600' | 'peach400' | 'wewin-orange500' | 'wewin-blue300';

export interface ProgressProps {
  totalCount: number;
  indicatorConfig?: {
    color: Color;
    activeNumber: number[];
  }[];
}
export function Progress({
  totalCount,
  indicatorConfig,
}: ProgressProps) {
  return (
    <div
      role="progressbar"
      className={cleanClassName(`${scss.track}`)}
    >
      {
        [...Array(totalCount)].map((_, idx) => (
            <div
              key={idx}
              className={cleanClassName(`
              ${scss.indicator} 
              ${indicatorConfig && scss[indicatorConfig?.filter((item) => item.activeNumber.includes(idx + 1)).map((item) => item.color)[0]]}
              `)}
              style={{
                width: `${100 / totalCount}%`,
              }}
            ></div>
          ),
        )
      }
    </div>
  );
}
