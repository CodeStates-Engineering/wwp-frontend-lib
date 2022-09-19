import scss from './EditStamp.module.scss';
import { format } from 'date-fns';
export interface EditStampProps {
  editType: string;
  editData?: Date;
  editor?: string;
}
export function EditStamp({ editType, editData, editor }: EditStampProps) {
  if (!editData || !editor) return <></>;
  return (
    <p className={scss.edit_stamp}>{`${editType}일: ${format(
      editData,
      'yyyy.MM.dd'
    )} | ${editType} 유저: ${editor}`}</p>
  );
}
