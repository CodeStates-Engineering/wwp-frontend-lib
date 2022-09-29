import { ModalOpener, Button } from "../../..";
import type { ModalOpenerProps, ButtonProps } from "../../..";
import { useParentState } from "@hooks";

export interface CancelModalOpenerProps {
  openerProps: Omit<ModalOpenerProps["openerProps"], "theme">;
  modalProps: Omit<
    ModalOpenerProps["modalProps"],
    "footerItems" | "title" | "modalType" | "children"
  >;
  cancelButtonProps?: ButtonProps;
  opened: ModalOpenerProps["opened"];
  children?: React.ReactNode;
}

export function CancelModalOpener({
  cancelButtonProps,
  openerProps,
  modalProps,
  opened,
  children,
}: CancelModalOpenerProps) {
  const [_opened, setOpened] = useParentState(opened);
  const _openerProps: ModalOpenerProps["openerProps"] = {
    theme: "bluish-gray600",
    variant: "outline",
    fontWeight: "bold",
    fontSize: "large",
    ...openerProps,
  };
  const _cancelButtonProps: ButtonProps = {
    theme: "wewin-peach500",
    fontWeight: "bold",
    fontSize: "medium",
    children: "네, 취소합니다.",
    ...cancelButtonProps,
    onClick: (event: any) => {
      setOpened(true);
      setTimeout(() => {
        setOpened(false);
        cancelButtonProps?.onClick?.(event);
      });
    },
  };
  const _modalProps: ModalOpenerProps["modalProps"] = {
    modalType: "center",
    title: (
      <>
        작성중인 내용이 사라집니다.
        <br />
        정말로 취소 하시겠습니까?
      </>
    ),
    footerItems: <Button {..._cancelButtonProps} />,
    ...modalProps,
  };
  return (
    <ModalOpener
      openerProps={_openerProps}
      modalProps={_modalProps}
      opened={_opened}
    >
      {children}
    </ModalOpener>
  );
}
