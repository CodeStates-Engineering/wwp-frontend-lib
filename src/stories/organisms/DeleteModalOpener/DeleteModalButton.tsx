import { Trash2 } from "react-feather";
import { ModalOpener } from "../../molecules";
import type { ModalOpenerProps } from "../../molecules";

export interface DeleteModalOpenerProps
  extends Omit<ModalOpenerProps<"button">, "modalOptions" | "type"> {
  modalOptions?: Omit<
    Required<ModalOpenerProps>["modalOptions"],
    "buttonsOptions"
  >;
  deleteButtonOptions?: Required<
    Required<ModalOpenerProps>["modalOptions"]
  >["buttonsOptions"][0];
}

export function DeleteModalOpener({
  deleteButtonOptions,
  openerOptions,
  modalOptions,
  ...restProps
}: DeleteModalOpenerProps) {
  const openerProps: DeleteModalOpenerProps["openerOptions"] = {
    fontWeight: "bold",
    fontSize: "large",
    variant: "ghost",
    theme: "bluish-gray600",
    icon: Trash2,
    ...openerOptions,
  };

  const deleteButtonProps: DeleteModalOpenerProps["deleteButtonOptions"] = {
    fontWeight: "bold",
    fontSize: "medium",
    children: "네, 삭제합니다.",
    theme: "wewin-peach500",
    delay: 3000,
    ...deleteButtonOptions,
  };

  const modalOpenerProps: ModalOpenerProps = {
    modalOptions: {
      modalType: "center",
      ...modalOptions,
      buttonsOptions: [deleteButtonProps],
    },
    openerOptions: openerProps,
    ...restProps,
  };
  return <ModalOpener {...modalOpenerProps} />;
}
