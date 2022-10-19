import scss from './TimeStamp.module.scss';
import { format } from 'date-fns';
export interface TimeStampProps {
  title: string;
  time?: Date;
  author?: string;
  isAdmin?: boolean;
}
export function TimeStamp({ title, time, author, isAdmin }: TimeStampProps) {
  let timeStampString = '';
  if (time || author) {
    timeStampString += title;
    if (time) {
      timeStampString += ` ${format(time, 'yyyy.MM.dd HH:mm:ss')}`;
    }
    if (author) {
      timeStampString += ` ${author}`;
    }
    if (isAdmin) {
      timeStampString += '(관리자)';
    }
  }

  return <p className={scss.time_stamp}>{timeStampString}</p>;
}
