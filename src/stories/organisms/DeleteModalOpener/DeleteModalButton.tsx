import { ModalOpener } from "../../molecules";
import { Button } from "../../atoms";
import type { ModalOpenerProps } from "../../molecules";
import { Trash } from "react-feather";

export interface DeleteModalOpenerProps
  extends Omit<ModalOpenerProps<"button">, "footerItems" | "openerType"> {}
export function DeleteModalOpener({
  modalType = "center",
  ...restProps
}: DeleteModalOpenerProps) {
  const DeleteModalOpenerProps = {
    ...restProps,
  };
  return (
    <ModalOpener
      {...DeleteModalOpenerProps}
      footerItems={<Button />}
      openerType="button"
      variant="ghost"
      theme="bluish-gray200"
      openerContents={"ss"}
      icon={Trash}
    />
  );
}
