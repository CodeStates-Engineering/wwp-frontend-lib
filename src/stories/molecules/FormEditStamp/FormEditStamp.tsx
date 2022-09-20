import { EditStamp, EditStampProps } from "../../atoms";

type EditInfo = Omit<EditStampProps, "editType">;
export interface FormEditStampProps {
  regist?: EditInfo;
  edit?: EditInfo;
}

export function FormEditStamp(props: FormEditStampProps) {
  const { edit, regist } = props;
  return (
    <div>
      <EditStamp editType="등록" {...regist} />
      <EditStamp editType="수정" {...edit} />
    </div>
  );
}
