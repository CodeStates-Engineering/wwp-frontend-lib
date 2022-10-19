import { TimeStamp } from '../../atoms';
import type { TimeStampProps } from '../../atoms';
import scss from './FormTimeStamp.module.scss';

type FormTimeStampItemProps = Omit<TimeStampProps, 'title'>;
export interface FormTimeStampProps {
  create?: FormTimeStampItemProps;
  update?: FormTimeStampItemProps;
}

export function FormTimeStamp({ create, update }: FormTimeStampProps) {
  return (
    <div className={scss.form_time_stamp}>
      <TimeStamp title="등록 일시" {...create} />
      <TimeStamp title="최종 수정 일시" {...update} />
    </div>
  );
}
