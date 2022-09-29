import { ModalOpener, Button } from "../../..";
import type { ModalOpenerProps, ButtonProps } from "../../..";
import { useParentState } from "@hooks";

type ConfirmReturnType = { isRejected: boolean } | void;

export interface ConfirmModalOpenerProps {
  openerProps?: Omit<ModalOpenerProps["openerProps"], "theme">;
  modalProps?: Omit<
    ModalOpenerProps["modalProps"],
    "footerItems" | "title" | "modalType" | "children"
  >;
  confirmButtonProps?: Omit<ButtonProps, "onClick"> & {
    onClick?: (event: any) => Promise<ConfirmReturnType> | ConfirmReturnType;
  };
  opened?: ModalOpenerProps["opened"];
  children?: React.ReactNode;
}

export function ConfirmModalOpener({
  confirmButtonProps,
  openerProps,
  modalProps,
  children,
  opened,
}: ConfirmModalOpenerProps) {
  const [_opened, setOpened] = useParentState(opened);
  const _openerProps: ModalOpenerProps["openerProps"] = {
    fontWeight: "bold",
    fontSize: "large",
    ...openerProps,
  };
  const _confirmButtonProps: ButtonProps = {
    fontWeight: "bold",
    fontSize: "medium",
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
    footerItems: <Button {..._confirmButtonProps} />,
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
