import { ModalOpener, Button } from "../../..";
import type { ModalOpenerProps, ButtonProps } from "../../..";
import { useParentState } from "@hooks";
import { Trash2 } from "react-feather";

type DeleteReturnType = { isRejected: boolean } | void;

export interface DeleteModalOpenerProps {
  openerProps?: Omit<ModalOpenerProps["openerProps"], "theme">;
  modalProps?: Omit<
    ModalOpenerProps["modalProps"],
    "footerItems" | "title" | "modalType" | "children"
  >;
  confirmButtonProps?: Omit<ButtonProps, "onClick"> & {
    onClick?: (event: any) => Promise<DeleteReturnType> | DeleteReturnType;
  };
  opened?: ModalOpenerProps["opened"];
  children?: React.ReactNode;
}

export function DeleteModalOpener({
  confirmButtonProps,
  openerProps,
  modalProps,
  children,
  opened,
}: DeleteModalOpenerProps) {
  const [_opened, setOpened] = useParentState(opened);
  const _openerProps: ModalOpenerProps["openerProps"] = {
    fontWeight: "bold",
    fontSize: "large",
    variant: "ghost",
    theme: "bluish-gray600",
    icon: Trash2,
    ...openerProps,
  };
  const _deleteButtonProps: ButtonProps = {
    fontWeight: "bold",
    fontSize: "medium",
    children: "네, 삭제합니다.",
    theme: "wewin-peach500",
    delay: 3000,
    onClick: (event: any) => {
      setOpened(true);
      setTimeout(async () => {
        const { isRejected } =
          (await confirmButtonProps?.onClick?.(event)) ?? {};
        !isRejected && setOpened(false);
      });
    },
    ...confirmButtonProps,
  };
  const _modalProps: ModalOpenerProps["modalProps"] = {
    modalType: "center",
    title: "정말로 삭제하시겠습니까?",
    footerItems: <Button {..._deleteButtonProps} />,
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
