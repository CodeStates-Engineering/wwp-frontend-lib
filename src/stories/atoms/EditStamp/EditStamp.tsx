import scss from "./EditStamp.module.scss";
import { format } from "date-fns";
export interface EditStampProps {
  editType: string;
  editDate?: Date;
  editor?: string;
}
export function EditStamp({ editType, editDate, editor }: EditStampProps) {
  if (!editDate || !editor) return <></>;
  return (
    <p className={scss.edit_stamp}>{`${editType}일: ${format(
      editDate,
      "yyyy.MM.dd"
    )} | ${editType} 유저: ${editor}`}</p>
  );
}
