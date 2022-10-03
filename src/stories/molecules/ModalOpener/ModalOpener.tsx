import {
  Modal,
  ModalProps,
  Tag,
  TagProps,
  ExpandableButton,
  ExpandableButtonProps,
  Button,
  ButtonProps,
} from "../../atoms";
import { useParentState } from "@hooks";

export type ModalOpenerType = "tag" | "expandable-button" | "button";

type OpenerProps<T extends ModalOpenerType = "button"> = T extends "tag"
  ? TagProps
  : T extends "expandable-button"
  ? ExpandableButtonProps
  : ButtonProps;

export interface ModalOpenerProps<T extends ModalOpenerType = "button"> {
  type?: T;
  children?: React.ReactNode;
  openerOptions?: OpenerProps<T>;
  modalOptions?: Omit<ModalProps, "children">;
}

type OpenerOnClickParams = OpenerProps[];

export function ModalOpener<T extends ModalOpenerType = "button">({
  type = "button" as T,
  children,
  openerOptions,
  modalOptions,
}: ModalOpenerProps<T>) {
  const { opened, onClose, ...restModalOptions } = modalOptions ?? {},
    [modalOpened, setModalOpend] = useParentState(opened);

  const { onClick, ...restOpenerOptions } = openerOptions ?? {};

  const openerProps = {
    ...restOpenerOptions,
    onClick: (
      event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
    ) => {
      setModalOpend(true);
      onClick?.(event);
    },
  };

  const modalProps = {
    ...restModalOptions,
    children,
    opened: modalOpened,
    onClose: () => {
      setModalOpend(false);
      onClose?.();
    },
  };

  return (
    <>
      {(() => {
        switch (type) {
          case "tag":
            return <Tag {...(openerProps as OpenerProps<"tag">)} />;
          case "expandable-button":
            return (
              <ExpandableButton
                {...(openerProps as OpenerProps<"expandable-button">)}
              />
            );
          default:
            return <Button {...(openerProps as OpenerProps<"button">)} />;
        }
      })()}
      <Modal {...modalProps} />
    </>
  );
}
