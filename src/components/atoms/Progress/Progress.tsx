import { cleanClassName, Color } from '../../../utils';
import scss from './Progress.module.scss';
import { colorUtil } from '../../../utils/colorUtil';

export interface ProgressProps {
  indicatorCount?: number;
  width?: React.CSSProperties['width'];
  trackColor?: Color;

  indicatorNum?: number;
  indicatorColor?: Color;

  subIndicatorColor?: Color;
  subIndicatorNum?: number;

  lastIndicatorColor?: Color;
  lastIndicatorNum?: number;
}
export function Progress({
  indicatorCount = 10,
  trackColor = 'bluishGray50',
  width,
  indicatorNum = 0,
  indicatorColor = 'wewinBlue600',
  subIndicatorNum = 0,
  subIndicatorColor = 'peach400',
  lastIndicatorNum = 0,
  lastIndicatorColor = 'wewinOrange500',
}: ProgressProps) {
  const parsedTrackColor = colorUtil.parse(trackColor);
  const parsedIndicatorColor = colorUtil.parse(indicatorColor);
  const parsedSubIndicatorColor = colorUtil.parse(subIndicatorColor);
  const parsedLastIndicatorColor = colorUtil.parse(lastIndicatorColor);

  return (
    <div
      role="progressbar"
      className={cleanClassName(`${scss.track}`)}
      style={{
        width,
        backgroundSize: `${100 / indicatorCount}%`,
        backgroundImage: `repeating-linear-gradient(to right, #ccd3e0, #ccd3e0 1px, ${parsedTrackColor} 1px, ${parsedTrackColor})`,
      }}
    >
      <div
        className={cleanClassName(`${scss.indicator}`)}
        style={{
          width: `${(indicatorNum / indicatorCount) * 100}%`,
          backgroundSize: `${100 / indicatorNum}%`,
          backgroundImage: `repeating-linear-gradient(to right, #ccd3e0, #ccd3e0 1px, ${parsedIndicatorColor} 1px, ${parsedIndicatorColor})`,
        }}
      ></div>
      <div
        className={cleanClassName(`${scss.sub_indicator}`)}
        style={{
          width: `${(subIndicatorNum / indicatorCount) * 100}%`,
          backgroundSize: `${100 / subIndicatorNum}%`,
          backgroundImage: `repeating-linear-gradient(to right, #ccd3e0, #ccd3e0 1px, ${parsedSubIndicatorColor} 1px, ${parsedSubIndicatorColor})`,
        }}
      ></div>
      <div
        className={cleanClassName(`${scss.last_indicator}`)}
        style={{
          width: `${(lastIndicatorNum / indicatorCount) * 100}%`,
          backgroundSize: `${100 / lastIndicatorNum}%`,
          backgroundImage: `repeating-linear-gradient(to right, #ccd3e0, #ccd3e0 1px, ${parsedLastIndicatorColor} 1px, ${parsedLastIndicatorColor})`,
        }}
      ></div>
    </div>
  );
}
