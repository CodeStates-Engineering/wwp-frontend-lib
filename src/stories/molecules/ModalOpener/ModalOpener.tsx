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
  opened?: boolean;
  openerProps?: { contents?: React.ReactNode } & Omit<
    OpenerProps<T>,
    "children"
  >;
  modalProps?: Omit<ModalProps, "children" | "opened">;
}

export function ModalOpener<T extends ModalOpenerType = "button">({
  type = "button" as T,
  children,
  opened = false,
  openerProps,
  modalProps,
}: ModalOpenerProps<T>) {
  const [modalOpened, setModalOpend] = useParentState(opened);
  const { contents, onClick, ...restOpenerProps } = openerProps ?? {
    contents: <></>,
  };

  const _openerProps = {
    ...restOpenerProps,
    children: contents,
    onClick: (event: any) => {
      onClick?.(event);
      setModalOpend(false);
      setTimeout(() => setModalOpend(true));
    },
  };

  const _modalProps = {
    children,
    opened: modalOpened,
    ...modalProps,
  };

  return (
    <>
      {(() => {
        switch (type) {
          case "tag":
            return <Tag {...(_openerProps as OpenerProps<"tag">)} />;
          case "expandable-button":
            return (
              <ExpandableButton
                {...(_openerProps as OpenerProps<"expandable-button">)}
              />
            );
          default:
            return <Button {...(_openerProps as OpenerProps<"button">)} />;
        }
      })()}
      <Modal {..._modalProps} />
    </>
  );
}
