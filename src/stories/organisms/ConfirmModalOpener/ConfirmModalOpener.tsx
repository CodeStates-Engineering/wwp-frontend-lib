import { ModalOpener } from "../../molecules";
import type { ModalOpenerProps } from "../../molecules";

export interface ConfirmModalOpenerProps
  extends Omit<ModalOpenerProps<"button">, "modalOptions" | "type"> {
  modalOptions?: Omit<
    Required<ModalOpenerProps>["modalOptions"],
    "buttonsOptions"
  >;
  confirmButtonOptions?: Required<
    Required<ModalOpenerProps>["modalOptions"]
  >["buttonsOptions"][0];
}

export function ConfirmModalOpener({
  confirmButtonOptions,
  openerOptions,
  modalOptions,
  ...restProps
}: ConfirmModalOpenerProps) {
  const openerProps: ConfirmModalOpenerProps["openerOptions"] = {
    fontWeight: "bold",
    fontSize: "large",
    ...openerOptions,
  };

  const confirmButtonProps: ConfirmModalOpenerProps["confirmButtonOptions"] = {
    fontWeight: "bold",
    fontSize: "medium",
    ...confirmButtonOptions,
  };

  const modalOpenerProps: ModalOpenerProps = {
    modalOptions: {
      ...modalOptions,
      buttonsOptions: [confirmButtonProps],
    },
    openerOptions: openerProps,
    ...restProps,
  };
  return <ModalOpener {...modalOpenerProps} />;
}
