import { ConfirmModalOpener, ConfirmModalOpenerProps } from "..";

export interface CancelModalOpenerProps
  extends Omit<ConfirmModalOpenerProps<"button">, "onConfirm" | "openerType"> {
  onCancel: ConfirmModalOpenerProps<"button">["onConfirm"];
}

export function CancelModalOpener({
  onCancel,
  confirmButtonContents = "네, 취소합니다.",
  modalType = "center",
  confirmButtonTheme = "wewin-peach500",
  fontWeight = "bold",
  fontSize = "large",
  theme = "white",
  title = (
    <>
      작성중인 내용이 사라집니다.
      <br />
      정말로 취소 하시겠습니까?
    </>
  ),
  ...restProps
}: CancelModalOpenerProps) {
  return (
    <ConfirmModalOpener
      openerType="button"
      {...restProps}
      theme={theme}
      fontWeight={fontWeight}
      fontSize={fontSize}
      confirmButtonTheme={confirmButtonTheme}
      title={title}
      modalType={modalType}
      onConfirm={onCancel}
    />
  );
}
