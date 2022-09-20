import scss from "./Chip.module.scss";
import { cleanClassName } from "@utils";
import { X } from "react-feather";
import { Button, Modal } from "../../atoms";
import { useState } from "react";

export interface ChipProps {
  children?: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  deleteDisabled?: boolean;
}
export function Chip(props: ChipProps) {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  return (
    <>
      <Modal
        opened={deleteModalOpened}
        modalType="center"
        title="정말로 삭제하시겠습니까?"
      >
        <Button
          fitContainer
          fontWeight="boldest"
          fontSize="medium"
          theme="wewin-peach500"
          onClick={() => {
            props.onDelete?.();
            setDeleteModalOpened(false);
          }}
        >
          네, 삭제합니다.
        </Button>
      </Modal>
      <div className={cleanClassName(`${scss.chip} ${props.className}`)}>
        <label className={scss.label}>{props.children}</label>
        <button
          className={scss.delete_button}
          onClick={() => {
            setDeleteModalOpened(false);
            setTimeout(() => setDeleteModalOpened(true));
          }}
          disabled={props.deleteDisabled}
        >
          <X />
        </button>
      </div>
    </>
  );
}
